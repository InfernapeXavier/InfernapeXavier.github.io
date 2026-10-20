export const animeStatuses = {
  CURRENT: "Watching",
  COMPLETED: "Completed",
  PLANNING: "Planned",
  PAUSED: "Paused",
  DROPPED: "Dropped",
  REPEATING: "Rewatching",
} as const;

export interface AnimeEntry {
  id: number;
  title: string;
  romaji: string;
  cover: string | null;
  genres: string[];
  tags?: string[];
  year: number | null;
  format: string | null;
  episodes: number | null;
  status: keyof typeof animeStatuses;
  score: number;
  continuations: number[];
}

export const neighborhoods = [
  {
    name: "Everyday & romance",
    genres: ["Slice of Life", "Romance", "Comedy"],
    color: "lavender",
  },
  {
    name: "Action & adventure",
    genres: ["Action", "Adventure"],
    color: "coral",
  },
  {
    name: "Fantasy & beyond",
    genres: ["Fantasy", "Supernatural"],
    color: "peach",
  },
  {
    name: "Mystery & tension",
    genres: ["Mystery", "Thriller", "Psychological", "Horror"],
    color: "pink",
  },
  {
    name: "Science & futures",
    genres: ["Sci-Fi", "Mecha"],
    color: "mint",
  },
  {
    name: "Sports & stage",
    genres: ["Sports", "Music"],
    color: "gold",
  },
] as const;

export interface AnimeSeries {
  id: number;
  title: string;
  entries: AnimeEntry[];
  neighborhood: number;
  x: number;
  y: number;
  neighbors: { id: number; similarity: number; shared: string[] }[];
}

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
    // More specific genres take precedence over broad Comedy/Drama labels.
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
      neighbors: [] as AnimeSeries["neighbors"],
    };
  });
  series.sort((a, b) => a.title.localeCompare(b.title, "en"));
  const features = series.map(
    (item) =>
      new Set(
        item.entries.flatMap((entry) => [
          ...entry.genres.map((genre) => `genre:${genre}`),
          ...(entry.tags ?? []).map((tag) => `tag:${tag}`),
        ])
      )
  );
  const frequency = new Map<string, number>();
  for (const values of features)
    for (const value of values)
      frequency.set(value, (frequency.get(value) ?? 0) + 1);
  // Weighted Jaccard: rarer shared themes carry more information than broad genres.
  const weight = (value: string) =>
    1 + Math.log((series.length + 1) / (frequency.get(value)! + 1));
  for (let a = 0; a < series.length; a++) {
    for (let b = a + 1; b < series.length; b++) {
      const union = new Set([...features[a], ...features[b]]);
      const shared = [...features[a]].filter((value) => features[b].has(value));
      const total = [...union].reduce((sum, value) => sum + weight(value), 0);
      const similarity = total
        ? shared.reduce((sum, value) => sum + weight(value), 0) / total
        : 0;
      if (!similarity) continue;
      const labels = shared
        .map((value) => value.slice(value.indexOf(":") + 1))
        .sort();
      series[a].neighbors.push({
        id: series[b].id,
        similarity,
        shared: labels,
      });
      series[b].neighbors.push({
        id: series[a].id,
        similarity,
        shared: labels,
      });
    }
  }
  for (const item of series)
    item.neighbors.sort((a, b) => b.similarity - a.similarity || a.id - b.id);
  const indices = new Map(series.map((item, index) => [item.id, index]));
  const links = series.flatMap((item, a) =>
    item.neighbors.slice(0, 4).map((neighbor) => ({
      a,
      b: indices.get(neighbor.id)!,
      strength: neighbor.similarity,
    }))
  );
  series.forEach((item, index) => {
    const angle = index * 2.399963;
    item.x = Math.cos(angle) * Math.sqrt(index + 1) * 12;
    item.y = Math.sin(angle) * Math.sqrt(index + 1) * 12;
  });
  // Settle once, deterministically. No animated simulation or hard genre boundaries.
  for (let step = 0; step < 260; step++) {
    const forces = series.map((item) => ({
      x: -item.x * 0.008,
      y: -item.y * 0.008,
    }));
    for (let a = 0; a < series.length; a++) {
      for (let b = a + 1; b < series.length; b++) {
        const dx = series[a].x - series[b].x;
        const dy = series[a].y - series[b].y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const force = 160 / (distance * distance);
        forces[a].x += dx * force;
        forces[a].y += dy * force;
        forces[b].x -= dx * force;
        forces[b].y -= dy * force;
      }
    }
    for (const { a, b, strength } of links) {
      const dx = series[b].x - series[a].x;
      const dy = series[b].y - series[a].y;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const force = (distance - (28 + 65 * (1 - strength))) * 0.025;
      forces[a].x += (dx / distance) * force;
      forces[a].y += (dy / distance) * force;
      forces[b].x -= (dx / distance) * force;
      forces[b].y -= (dy / distance) * force;
    }
    series.forEach((item, index) => {
      item.x += Math.max(-8, Math.min(8, forces[index].x));
      item.y += Math.max(-8, Math.min(8, forces[index].y));
    });
  }
  const extent = Math.max(
    1,
    ...series.flatMap((item) => [Math.abs(item.x), Math.abs(item.y)])
  );
  for (const item of series) {
    item.x = Number((500 + (item.x / extent) * 400).toFixed(2));
    item.y = Number((325 + (item.y / extent) * 250).toFixed(2));
  }
  return series;
}
