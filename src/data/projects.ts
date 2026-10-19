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
      "A Discord bot for finding anime and manga. Written in Rust, with AniList data and Gemini-powered search.",
    longDescription:
      "I've been working on Annie-Mei since 2022. It lets you search AniList from Discord using slash commands. I added Gemini so you can describe what you're looking for without knowing the title. I've spent a lot of time on the search, caching, and account-linking parts, along with preferences and privacy controls for users and servers.",
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
      "Search uses AniList's GraphQL API, fuzzy matching, and Redis caching.",
      "Account linking runs through a separate Rocket OAuth service with PostgreSQL.",
    ],
  },
  {
    title: "RustyBase",
    description:
      "I wanted to understand how a database works, so I wrote one in Rust. No external crates or unsafe blocks.",
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
