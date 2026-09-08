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
      "A Rust Discord bot that combines AniList tracking with Gemini-powered natural-language search and privacy-aware preferences.",
    longDescription:
      "Annie-Mei began as a reason to learn Rust and grew into a production Discord bot. It connects slash commands to AniList, adds Gemini-powered natural-language search, and gives users and servers configurable preferences with privacy controls. A separate Rocket OAuth service handles PostgreSQL persistence and signed request context.",
    image: "/projects/annie-mei.webp",
    technologies: ["Rust", "GraphQL", "PostgreSQL", "Redis", "OAuth"],
    githubUrl: "https://github.com/annie-mei",
    liveUrl:
      "https://discord.com/oauth2/authorize?client_id=962106280430932079&permissions=2147483648&integration_type=0&scope=bot",
    isInProgress: true,
    isFeatured: true,
    highlights: [
      "Connected Discord slash commands with the AniList GraphQL API.",
      "Added Gemini-powered search plus user and server preferences with privacy controls.",
      "Improved response quality and latency with fuzzy matching, external APIs, and Redis caching.",
      "Built a Rocket OAuth service with PostgreSQL, signed request context, and CI validation.",
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
