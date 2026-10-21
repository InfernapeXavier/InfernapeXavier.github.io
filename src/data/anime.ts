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
}

export function getAnimeNeighbors(series: AnimeSeries[], selectedId: number) {
  const features = series.map(
    (item) =>
      new Set(
        item.entries
          .flatMap((entry) => [
            ...entry.genres.map((genre) => `genre:${genre}`),
            ...(entry.tags ?? []).map((tag) => `tag:${tag}`),
          ])
          .sort()
      )
  );
  const frequency = new Map<string, number>();
  for (const values of features)
    for (const value of values)
      frequency.set(value, (frequency.get(value) ?? 0) + 1);
  // Weighted Jaccard: rarer shared themes carry more information than broad genres.
  const weight = (value: string) =>
    1 + Math.log((series.length + 1) / (frequency.get(value)! + 1));
  const selected = features[series.findIndex((item) => item.id === selectedId)];
  return series
    .flatMap((item, index) => {
      if (item.id === selectedId) return [];
      const shared = [...selected].filter((value) =>
        features[index].has(value)
      );
      if (!shared.length) return [];
      const union = new Set([...selected, ...features[index]]);
      const total = [...union]
        .sort()
        .reduce((sum, value) => sum + weight(value), 0);
      return [
        {
          id: item.id,
          similarity:
            shared.reduce((sum, value) => sum + weight(value), 0) / total,
          shared: shared
            .map((value) => value.slice(value.indexOf(":") + 1))
            .sort(),
        },
      ];
    })
    .sort((a, b) => b.similarity - a.similarity || a.id - b.id);
}
