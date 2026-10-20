import assert from "node:assert/strict";
import test from "node:test";
import { buildAnimeAtlas, type AnimeEntry } from "./anime";

test("the atlas groups explicit continuation chains, not shared genres or missing links", () => {
  const base: AnimeEntry = {
    id: 40,
    title: "Original season",
    romaji: "Original season",
    cover: null,
    genres: ["Romance", "Comedy"],
    year: 2015,
    format: "TV",
    episodes: 12,
    status: "COMPLETED",
    score: 91,
    continuations: [70],
  };
  const sequel: AnimeEntry = {
    ...base,
    id: 70,
    title: "Second season",
    year: 2017,
    status: "PLANNING",
    score: 0,
    continuations: [40, 20],
  };
  const finale: AnimeEntry = {
    ...base,
    id: 20,
    title: "Final film",
    year: 2019,
    continuations: [70],
  };
  const unrelated: AnimeEntry = {
    ...base,
    id: 90,
    title: "Unrelated romance",
    continuations: [999],
  };
  const data = [finale, unrelated, sequel, base, sequel];
  const atlas = buildAnimeAtlas(data);

  assert.equal(atlas.length, 2);
  const series = atlas.find((item) => item.title === "Original season")!;
  assert.deepEqual(
    series.entries.map((entry) => [entry.id, entry.status, entry.score]),
    [
      [40, "COMPLETED", 91],
      [70, "PLANNING", 0],
      [20, "COMPLETED", 91],
    ]
  );
  assert.deepEqual(
    atlas
      .find((item) => item.title === "Unrelated romance")
      ?.entries.map((entry) => entry.id),
    [90]
  );
  assert.deepEqual(buildAnimeAtlas([...data].reverse()), atlas);
  assert.deepEqual(buildAnimeAtlas([]), []);
});

test("taste neighbors use all themes, prefer specific overlap, and never invent links", () => {
  const base: AnimeEntry = {
    id: 1,
    title: "Anchor",
    romaji: "Anchor",
    cover: null,
    genres: ["Drama"],
    tags: ["School", "Disability"],
    year: 2016,
    format: "MOVIE",
    episodes: 1,
    status: "COMPLETED",
    score: 100,
    continuations: [],
  };
  const entries: AnimeEntry[] = [
    base,
    { ...base, id: 2, title: "Broad overlap", tags: [] },
    {
      ...base,
      id: 3,
      title: "Specific overlap",
      genres: ["Romance"],
      tags: ["School", "Disability"],
    },
    { ...base, id: 4, title: "Unconnected", genres: ["Sports"], tags: [] },
    { ...base, id: 5, title: "Another drama", tags: [] },
  ];
  const atlas = buildAnimeAtlas(entries);
  const anchor = atlas.find((item) => item.id === 1)!;
  assert.equal(anchor.neighbors[0].id, 3);
  assert.deepEqual(anchor.neighbors[0].shared, ["Disability", "School"]);
  assert.ok(
    anchor.neighbors[0].similarity >
      anchor.neighbors.find((item) => item.id === 2)!.similarity
  );
  assert.equal(
    anchor.neighbors.some((item) => item.id === 4),
    false
  );
  assert.equal(atlas.length, 5);
  assert.deepEqual(buildAnimeAtlas([...entries].reverse()), atlas);
  assert.ok(
    atlas.every((item) => Number.isFinite(item.x) && Number.isFinite(item.y))
  );
});
