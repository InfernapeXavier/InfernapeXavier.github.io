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
      "An anime side quest that became a real project. A Rust-powered Discord bot that brings anime and manga search to your server.",
    longDescription:
      "Annie-Mei is where my interest in anime meets my habit of building things in Rust. I've been working on it since 2022, connecting AniList to Discord so people can find anime and manga without leaving the conversation. Gemini-powered search lets you describe what you're looking for instead of guessing the right title. Behind the slash commands is a whole other project: making search forgiving, keeping responses quick, and getting account connections right. Plenty of small problems to get delightfully stuck into.",
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
      "Under the hood: AniList's GraphQL API, fuzzy matching, and Redis caching.",
      "The less visible bits matter too: a Rocket OAuth service, PostgreSQL, and privacy controls for users and servers.",
    ],
  },
  {
    title: "RustyBase",
    description:
      'What happens when "I wonder how databases work" gets out of hand? A database from scratch in Rust. No unsafe blocks. No external crates. Just the pieces, built by hand.',
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
