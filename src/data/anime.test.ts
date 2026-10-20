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
