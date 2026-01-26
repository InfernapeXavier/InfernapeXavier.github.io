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
  highlights?: string[];
}

export const projects: Project[] = [
  {
    title: "Annie Mei",
    description:
      "A Discord bot for tracking anime and manga progress, built in idiomatic Rust with a focus on correctness and performance.",
    longDescription:
      "What started as a way to learn Rust turned into a full-featured Discord bot that I actually use daily. Annie Mei connects to AniList's GraphQL API to let users track their anime and manga progress directly in Discord. The interesting challenges have been around implementing OAuth flows, building efficient caching layers, and designing fuzzy matching for search. It's hosted on a mix of Upstash (Redis), Neon (Postgres), and Oracle Cloud Infrastructure.",
    image: "/projects/annie-mei.webp",
    technologies: ["Rust", "GraphQL", "PostgreSQL", "Redis", "OAuth"],
    githubUrl: "https://github.com/annie-mei",
    liveUrl:
      "https://discord.com/api/oauth2/authorize?client_id=931012939816767498&permissions=534723950656&scope=bot%20applications.commands",
    isInProgress: true,
    isFeatured: true,
    highlights: [
      "Written in idiomatic Rust, emphasizing correctness and maintainability",
      "OAuth integration with AniList for user authentication",
      "Multi-layer caching with Redis (Upstash) and PostgreSQL (Neon)",
      "Fuzzy matching for flexible anime/manga search",
      "Deployed on Oracle Cloud Infrastructure",
    ],
  },
  {
    title: "RustyBase",
    description:
      'A database built in Rust without using any "unsafe" blocks or external crates. Features a fully functioning Lexer, Parser, and uses TPC-H data for benchmarks.',
    image: "/projects/rustybase.webp",
    technologies: ["Rust"],
    githubUrl: "https://gitlab.com/InfernapeXavier/RustyBase",
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
