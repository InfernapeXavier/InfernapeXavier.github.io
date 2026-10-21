// Imported by the server page only; the layout library must not reach the browser.
import { UMAP } from "umap-js";
import {
  getAnimeNeighbors,
  neighborhoods,
  type AnimeEntry,
  type AnimeSeries,
} from "./anime";

// Only explicit prequel/sequel links join entries. Shared genres never merge them.
export function buildAnimeAtlas(entries: AnimeEntry[]): AnimeSeries[] {
  const unique = new Map(entries.map((entry) => [entry.id, entry]));
  const parents = new Map([...unique.keys()].map((id) => [id, id]));
  function root(id: number): number {
    const parent = parents.get(id)!;
    if (parent === id) return id;
    const result = root(parent);
    parents.set(id, result);
    return result;
  }
  for (const entry of unique.values()) {
    for (const id of entry.continuations) {
      if (unique.has(id)) {
        const a = root(entry.id);
        const b = root(id);
        parents.set(Math.max(a, b), Math.min(a, b));
      }
    }
  }
  const groups = new Map<number, AnimeEntry[]>();
  for (const entry of unique.values()) {
    const id = root(entry.id);
    groups.set(id, [...(groups.get(id) ?? []), entry]);
  }
  const series = [...groups].map(([id, members]) => {
    members.sort(
      (a, b) => (a.year ?? Infinity) - (b.year ?? Infinity) || a.id - b.id
    );
    const neighborhood =
      [5, 3, 4, 2, 1].find((index) =>
        neighborhoods[index].genres.some((genre) =>
          members[0].genres.includes(genre)
        )
      ) ?? 0;
    return {
      id,
      title: members[0].title,
      entries: members,
      neighborhood,
      x: 0,
      y: 0,
    };
  });
  series.sort((a, b) => a.title.localeCompare(b.title, "en"));
  if (!series.length) return series;

  // For tiny lists there are too few points to fit a neighborhood model.
  let points = series.map((_, index) => [index, 0]);
  if (series.length > 2) {
    const indices = new Map(series.map((item, index) => [item.id, index]));
    const distances = series.map((item, index) => {
      const row = Array<number>(series.length).fill(1);
      row[index] = 0;
      for (const neighbor of getAnimeNeighbors(series, item.id))
        row[indices.get(neighbor.id)!] = 1 - neighbor.similarity;
      return row;
    });
    const nNeighbors = Math.min(10, series.length - 1);
    const knn = distances.map((row, index) => [
      index,
      ...row
        .map((distance, other) => ({ distance, other }))
        .filter((item) => item.other !== index)
        .sort((a, b) => a.distance - b.distance || a.other - b.other)
        .slice(0, nNeighbors - 1)
        .map((item) => item.other),
    ]);
    let seed = 42;
    const umap = new UMAP({
      nNeighbors,
      minDist: 0.2,
      random: () =>
        (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296,
    });
    // Exact neighbors, including self first, bypass approximate neighbor search.
    umap.setPrecomputedKNN(
      knn,
      knn.map((row, index) => row.map((other) => distances[index][other]))
    );
    points = umap.fit(series.map((_, index) => [index]));
  }
  const center = [0, 1].map(
    (axis) =>
      (Math.min(...points.map((point) => point[axis])) +
        Math.max(...points.map((point) => point[axis]))) /
      2
  );
  const extent = Math.max(
    1,
    ...points.flatMap((point) => [
      Math.abs(point[0] - center[0]),
      Math.abs(point[1] - center[1]),
    ])
  );
  series.forEach((item, index) => {
    item.x = Number(
      (500 + ((points[index][0] - center[0]) / extent) * 400).toFixed(2)
    );
    item.y = Number(
      (325 + ((points[index][1] - center[1]) / extent) * 250).toFixed(2)
    );
  });
  return series;
}
