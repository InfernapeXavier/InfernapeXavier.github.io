export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  isInProgress?: boolean;
  isFeatured?: boolean;
  isSecondary?: boolean;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    title: "Annie-Mei",
    description:
      "A Rust Discord bot for anime and manga, with Gemini-powered natural-language search and AniList integration.",
    longDescription:
      "I've been building Annie-Mei as a hobby project since 2022. It brings AniList's GraphQL API into Discord through slash commands, with Gemini-powered natural-language search to help people find anime and manga. The work spans external API integrations, fuzzy matching, Redis caching, and a separate Rocket OAuth service with PostgreSQL persistence. User- and server-level preferences include privacy controls.",
    image: "/projects/annie-mei.webp",
    technologies: [
      "Rust",
      "Gemini",
      "GraphQL",
      "PostgreSQL",
      "Redis",
      "Rocket",
    ],
    githubUrl: "https://github.com/annie-mei",
    liveUrl: "https://anniemei.app",
    isInProgress: true,
    isFeatured: true,
    highlights: [
      "Discord slash commands integrated with the AniList GraphQL API.",
      "Gemini-powered natural-language search and configurable user- and server-level preferences with privacy controls.",
      "External API integrations, fuzzy matching, and Redis caching to improve response quality and latency.",
      "A separate Rocket OAuth service with PostgreSQL persistence, signed request context, and CI validation.",
    ],
  },
  {
    title: "RustyBase",
    description:
      'A database built from scratch in Rust without any "unsafe" blocks or external crates—just to see how far safe Rust can go.',
    image: "/projects/rustybase.webp",
    technologies: ["Rust"],
    githubUrl: "https://gitlab.com/InfernapeXavier/RustyBase",
    isSecondary: true,
  },
  {
    title: "Bean-Stock",
    description:
      "Stock market forecasting using a 3-pronged approach: ML models, NLP sentiment analysis, and custom health metrics to help users make informed investment decisions.",
    image: "/projects/beanstock.webp",
    technologies: ["Python", "Flask", "PANDAS", "Scikit-learn"],
    githubUrl: "https://github.com/InfernapeXavier/Bean-Stock",
  },
  {
    title: "Club N.O.W.",
    description:
      "Founded Network for the Open Web—a community bringing together tech enthusiasts to build open source projects and create a better environment for developers.",
    image: "/projects/now.webp",
    technologies: ["Community", "Open Source", "Workshops"],
    githubUrl: "https://github.com/nowmozillaclub",
    liveUrl: "https://nowmozilla.club",
  },
];
