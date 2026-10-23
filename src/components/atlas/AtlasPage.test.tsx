import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import AtlasPage from "./AtlasPage";

test("anime and manga atlases load their own lists and render the right units, statuses, and links", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_input, options) => {
    const { variables } = JSON.parse(options!.body as string);
    const manga = variables.type === "MANGA";
    const id = manga ? 10 : 20;
    return new Response(
      JSON.stringify({
        data: {
          MediaListCollection: {
            hasNextChunk: variables.chunk === 1,
            lists: [
              {
                entries: [
                  {
                    status: variables.chunk === 1 ? "CURRENT" : "COMPLETED",
                    score: 95,
                    media: {
                      id: id + variables.chunk - 1,
                      title: {
                        english: `${manga ? "Manga" : "Anime"} ${variables.chunk}`,
                        romaji: "Title",
                      },
                      coverImage: { large: null },
                      genres: ["Drama"],
                      tags: [],
                      isAdult: false,
                      startDate: { year: 2010 + variables.chunk },
                      format: manga ? "MANGA" : "TV",
                      episodes: manga ? null : 12,
                      chapters: manga ? 64 : null,
                      volumes: manga ? 7 : null,
                      relations: {
                        edges:
                          variables.chunk === 1
                            ? [
                                {
                                  relationType: "SEQUEL",
                                  node: { id: id + 1, type: variables.type },
                                },
                              ]
                            : [],
                      },
                    },
                  },
                ],
              },
            ],
          },
        },
      })
    );
  };
  try {
    const manga = renderToStaticMarkup(await AtlasPage({ mediaType: "MANGA" }));
    const mangaText = manga.replace(/<[^>]*>/g, "");
    assert.match(mangaText, /What I’ve been reading/);
    assert.match(mangaText, /64 chapters · 7 volumes/);
    assert.match(mangaText, /ReadingMy score/);
    assert.match(manga, /href="https:\/\/anilist.co\/manga\/10"/);
    assert.match(mangaText, /across 1 series/);
    assert.match(mangaText, /In this series 2/);
    assert.doesNotMatch(
      manga,
      /episodes|Watched \/ watching|anilist.co\/anime\//
    );

    const anime = renderToStaticMarkup(await AtlasPage({ mediaType: "ANIME" }));
    const animeText = anime.replace(/<[^>]*>/g, "");
    assert.match(animeText, /What I’ve been watching/);
    assert.match(animeText, /12 episodes/);
    assert.match(animeText, /WatchingMy score/);
    assert.match(anime, /href="https:\/\/anilist.co\/anime\/20"/);
    assert.match(anime, /across 1 series/);
    assert.doesNotMatch(anime, /chapters|volumes|anilist.co\/manga\//);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
