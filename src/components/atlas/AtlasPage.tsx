import { type MediaEntry, type MediaType } from "@/data/media";
import { buildMediaAtlas } from "@/data/media-atlas";
import MediaAtlas from "./MediaAtlas";
import styles from "./atlas.module.css";

interface ListEntry {
  status: MediaEntry["status"];
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
    chapters: number | null;
    volumes: number | null;
    relations: {
      edges: { relationType: string; node: { id: number; type: string } }[];
    };
  } | null;
}

async function getMediaList(mediaType: MediaType): Promise<MediaEntry[]> {
  const entries = new Map<number, MediaEntry>();
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
        query: `query ($chunk: Int!, $type: MediaType!) {
          MediaListCollection(userName: "InfernapeXavier", type: $type, chunk: $chunk, perChunk: 500) {
            hasNextChunk
            lists { entries {
              status score(format: POINT_100)
              media {
                id title { english romaji } coverImage { large }
                genres isAdult startDate { year } format episodes chapters volumes
                tags { name rank isGeneralSpoiler isMediaSpoiler isAdult }
                relations { edges { relationType node { id type } } }
              }
            } }
          }
        }`,
        variables: { chunk, type: mediaType },
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
          ...(mediaType === "MANGA" && {
            chapters: media.chapters,
            volumes: media.volumes,
          }),
          status,
          score,
          continuations: media.relations.edges
            .filter(
              (edge) =>
                ["PREQUEL", "SEQUEL"].includes(edge.relationType) &&
                edge.node.type === mediaType
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

export default async function AtlasPage({
  mediaType,
}: {
  mediaType: MediaType;
}) {
  const name = mediaType === "MANGA" ? "Manga" : "Anime";
  const kind = mediaType === "MANGA" ? "manga" : "anime";
  let entries: MediaEntry[];
  try {
    entries = await getMediaList(mediaType);
  } catch (error) {
    console.error(`Unable to load ${kind} atlas`, error);
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>
          {name} Atlas<span>↗</span>
        </h1>
        <p className={styles.unavailable}>
          Couldn’t load my {kind} list from AniList. Try again later, or view it
          there.
        </p>
        <a
          className={styles.sourceLink}
          href={`https://anilist.co/user/InfernapeXavier/${kind}list`}
        >
          Visit my list on AniList ↗
        </a>
      </div>
    );
  }
  return (
    <MediaAtlas
      key={mediaType}
      mediaType={mediaType}
      series={buildMediaAtlas(entries)}
    />
  );
}
