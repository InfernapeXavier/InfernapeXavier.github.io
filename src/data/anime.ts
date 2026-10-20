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
    x: 225,
    y: 185,
    color: "lavender",
  },
  {
    name: "Action & adventure",
    genres: ["Action", "Adventure"],
    x: 220,
    y: 465,
    color: "coral",
  },
  {
    name: "Fantasy & beyond",
    genres: ["Fantasy", "Supernatural"],
    x: 515,
    y: 195,
    color: "peach",
  },
  {
    name: "Mystery & tension",
    genres: ["Mystery", "Thriller", "Psychological", "Horror"],
    x: 795,
    y: 195,
    color: "pink",
  },
  {
    name: "Science & futures",
    genres: ["Sci-Fi", "Mecha"],
    x: 510,
    y: 475,
    color: "mint",
  },
  {
    name: "Sports & stage",
    genres: ["Sports", "Music"],
    x: 800,
    y: 465,
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
    };
  });
  series.sort((a, b) => a.title.localeCompare(b.title, "en"));
  for (let index = 0; index < neighborhoods.length; index++) {
    const region = neighborhoods[index];
    const members = series.filter((item) => item.neighborhood === index);
    members.forEach((item, position) => {
      const angle = position * Math.PI * (3 - Math.sqrt(5));
      const radius = Math.sqrt((position + 0.5) / members.length);
      // Trigonometric rounding differs slightly across JS runtimes during SSR.
      item.x = Number((region.x + Math.cos(angle) * radius * 125).toFixed(2));
      item.y = Number((region.y + Math.sin(angle) * radius * 92).toFixed(2));
    });
  }
  return series;
}
