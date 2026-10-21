import assert from "node:assert/strict";
import test from "node:test";
import { buildAnimeAtlas, buildAnimeMetro, type AnimeEntry } from "./anime";

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

test("metro stations carry only real shared routes, are unique, and recenter on selection", () => {
  const base: AnimeEntry = {
    id: 1,
    title: "Anchor",
    romaji: "Anchor",
    cover: null,
    genres: ["Drama", "Romance"],
    year: 2016,
    format: "MOVIE",
    episodes: 1,
    status: "COMPLETED",
    score: 100,
    continuations: [],
  };
  const atlas = buildAnimeAtlas([
    base,
    { ...base, id: 2, title: "Shared interchange" },
    { ...base, id: 3, title: "Drama only", genres: ["Drama", "Action"] },
    { ...base, id: 4, title: "Not on this network", genres: ["Sports"] },
    ...[5, 6, 7, 8].map((id) => ({
      ...base,
      id,
      title: `Romance ${id}`,
      genres: ["Romance"],
      score: id * 10,
    })),
  ]);
  const metro = buildAnimeMetro(atlas, 1);
  assert.deepEqual(metro.lines, ["Drama", "Romance"]);
  assert.equal(metro.stations[0].id, 1);
  assert.equal(
    new Set(metro.stations.map((item) => item.id)).size,
    metro.stations.length
  );
  assert.equal(
    metro.stations.some((item) => item.id === 4),
    false
  );
  assert.deepEqual(metro.stations.find((item) => item.id === 2)!.lines, [0, 1]);
  assert.deepEqual(metro.stations.find((item) => item.id === 3)!.lines, [0]);
  assert.deepEqual(
    metro.branches
      .find((branch) => branch.lines.join() === "1")!
      .stations.map((item) => item.id),
    [8, 7, 6]
  );
  for (const station of metro.stations)
    for (const line of station.lines)
      assert.ok(
        station.entries.some((entry) =>
          entry.genres.includes(metro.lines[line])
        )
      );
  const recentered = buildAnimeMetro(atlas, 3);
  assert.deepEqual(recentered.lines, ["Action", "Drama"]);
  assert.equal(recentered.stations[0].id, 3);
  assert.equal(
    recentered.stations.some((item) => item.id === 8),
    false
  );
  assert.equal(recentered.stations.find((item) => item.id === 3)!.x, 600);
  assert.deepEqual(buildAnimeMetro([], undefined), {
    lines: [],
    branches: [],
    stations: [],
  });
});
