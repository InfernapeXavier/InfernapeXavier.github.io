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
    };
  });
  series.sort((a, b) => a.title.localeCompare(b.title, "en"));
  return series;
}

// A focus metro: genre routes branch at real shared-genre interchanges.
export function buildAnimeMetro(
  series: AnimeSeries[],
  selectedId: number | undefined
) {
  const selected = series.find((item) => item.id === selectedId);
  const lines = [
    ...new Set(selected?.entries.flatMap((entry) => entry.genres) ?? []),
  ].sort();
  const groups = new Map<string, { lines: number[]; members: AnimeSeries[] }>();
  for (const item of series) {
    if (item.id === selectedId) continue;
    const shared = lines.flatMap((genre, index) =>
      item.entries.some((entry) => entry.genres.includes(genre)) ? [index] : []
    );
    if (!shared.length) continue;
    const key = shared.join(",");
    const group = groups.get(key) ?? { lines: shared, members: [] };
    group.members.push(item);
    groups.set(key, group);
  }
  const directions = [
    [1, -1],
    [-1, 1],
    [-1, -1],
    [1, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];
  const branches = [...groups.values()]
    .sort(
      (a, b) =>
        b.members.length - a.members.length ||
        a.lines.join(",").localeCompare(b.lines.join(","), "en")
    )
    .slice(0, 8)
    .map((group, index) => {
      const [dx, dy] = directions[index];
      const members = [...group.members]
        .sort(
          (a, b) =>
            Math.max(...b.entries.map((entry) => entry.score)) -
              Math.max(...a.entries.map((entry) => entry.score)) || a.id - b.id
        )
        .slice(0, 3);
      return {
        lines: group.lines,
        dx,
        dy,
        stations: members.map((item, position) => ({
          ...item,
          x: 600 + dx * (160 + position * 105),
          y: 420 + dy * ((dx === 0 ? 120 : 125) + position * 100),
          lines: group.lines,
          dx,
          dy,
          position,
        })),
      };
    });
  return {
    lines,
    branches,
    stations: [
      ...(selected
        ? [
            {
              ...selected,
              x: 600,
              y: 420,
              lines: lines.map((_, index) => index),
              dx: 0,
              dy: 0,
              position: 0,
            },
          ]
        : []),
      ...branches.flatMap((branch) => branch.stations),
    ],
  };
}
