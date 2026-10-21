import type { Metadata } from "next";
import { animeStatuses, type AnimeEntry } from "@/data/anime";
import { buildAnimeAtlas } from "@/data/anime-atlas";
import AnimeAtlas from "./AnimeAtlas";
import styles from "./anime.module.css";

export const metadata: Metadata = {
  title: "Anime Atlas",
  description:
    "What Rohit's been watching, with ratings and similar anime from his AniList list.",
};

export const revalidate = 3600;

interface ListEntry {
  status: keyof typeof animeStatuses;
  score: number;
  media: {
    id: number;
    title: { english: string | null; romaji: string };
    coverImage: { large: string | null };
    genres: string[];
    tags: {
      name: string;
      rank: number | null;
      isGeneralSpoiler: boolean | null;
      isMediaSpoiler: boolean | null;
      isAdult: boolean | null;
    }[];
    isAdult: boolean;
    startDate: { year: number | null };
    format: string | null;
    episodes: number | null;
    relations: {
      edges: { relationType: string; node: { id: number; type: string } }[];
    };
  } | null;
}

async function getAnimeList(): Promise<AnimeEntry[]> {
  const entries = new Map<number, AnimeEntry>();
  let chunk = 1;
  let hasNextChunk = true;
  while (hasNextChunk) {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query ($chunk: Int!) {
          MediaListCollection(userName: "InfernapeXavier", type: ANIME, chunk: $chunk, perChunk: 500) {
            hasNextChunk
            lists { entries {
              status score(format: POINT_100)
              media {
                id title { english romaji } coverImage { large }
                genres isAdult startDate { year } format episodes
                tags { name rank isGeneralSpoiler isMediaSpoiler isAdult }
                relations { edges { relationType node { id type } } }
              }
            } }
          }
        }`,
        variables: { chunk },
      }),
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`AniList returned ${response.status}`);
    const result = (await response.json()) as {
      errors?: { message: string }[];
      data?: {
        MediaListCollection: {
          hasNextChunk: boolean;
          lists: { entries: ListEntry[] }[];
        } | null;
      };
    };
    const collection = result.data?.MediaListCollection;
    if (result.errors?.length || !collection)
      throw new Error("AniList list unavailable");
    for (const list of collection.lists) {
      for (const { media, status, score } of list.entries) {
        if (!media || media.isAdult) continue;
        entries.set(media.id, {
          id: media.id,
          title: media.title.english || media.title.romaji,
          romaji: media.title.romaji,
          cover: media.coverImage.large,
          genres: media.genres,
          tags: media.tags
            .filter(
              (tag) =>
                !tag.isGeneralSpoiler &&
                !tag.isMediaSpoiler &&
                !tag.isAdult &&
                (tag.rank ?? 0) >= 60
            )
            .map((tag) => tag.name),
          year: media.startDate.year,
          format: media.format,
          episodes: media.episodes,
          status,
          score,
          continuations: media.relations.edges
            .filter(
              (edge) =>
                ["PREQUEL", "SEQUEL"].includes(edge.relationType) &&
                edge.node.type === "ANIME"
            )
            .map((edge) => edge.node.id),
        });
      }
    }
    hasNextChunk = collection.hasNextChunk;
    chunk++;
  }
  return [...entries.values()];
}

export default async function AnimePage() {
  let entries: AnimeEntry[];
  try {
    entries = await getAnimeList();
  } catch (error) {
    console.error("Unable to load anime atlas", error);
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>
          Anime Atlas<span>↗</span>
        </h1>
        <p className={styles.unavailable}>
          Couldn’t load my anime list from AniList. Try again later, or view it
          there.
        </p>
        <a
          className={styles.sourceLink}
          href="https://anilist.co/user/InfernapeXavier/animelist"
        >
          Visit my list on AniList ↗
        </a>
      </div>
    );
  }
  return <AnimeAtlas series={buildAnimeAtlas(entries)} />;
}
