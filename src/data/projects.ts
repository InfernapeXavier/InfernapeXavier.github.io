export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  isInProgress?: boolean;
}

export const projects: Project[] = [
  {
    title: "Annie Mei",
    description:
      "A Discord bot that helps you track your anime and manga progress. Built with Rust, it uses GraphQL to interact with AniList's API, and PostgreSQL + Redis for caching and data persistence. The bot features a robust permission system and supports multiple guilds.",
    image: "/images/annie-mei.png",
    technologies: ["Rust", "GraphQL", "PostgreSQL", "Redis", "Discord API"],
    githubUrl: "https://github.com/InfernapeXavier/annie-mei",
    liveUrl:
      "https://discord.com/api/oauth2/authorize?client_id=931012939816767498&permissions=534723950656&scope=bot%20applications.commands",
    isInProgress: true,
  },
  {
    title: "Personal Website",
    description:
      "A modern, responsive personal website built with Next.js 14, TypeScript, and Tailwind CSS. Features server-side rendering, optimized images and fonts, and a clean, minimalist design.",
    image: "/images/personal-website.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    githubUrl: "https://github.com/InfernapeXavier/InfernapeXavier.github.io",
    liveUrl: "https://rohitk.xyz",
  },
  {
    title: "RustyBase",
    description:
      'A database built in Rust without using any "unsafe" blocks of code or external crates! RustyBase is an ongoing project but in its current form has the basic layout of a database, along with a fully functioning Lexer and Parser and uses TPCH data for benchmarks.',
    image: "/projects/rustybase.webp",
    technologies: ["Rust"],
    githubUrl: "https://gitlab.com/InfernapeXavier/RustyBase",
  },
  {
    title: "Bean-Stock",
    description:
      "Using a 3-pronged approach to the problem of Stock-Market Forecasting, Bean-Stock gives the user all the information they need to make an informed decision on where to invest next by using ML, NLP and our secret-sauce Health Analysis.",
    image: "/projects/beanstock.webp",
    technologies: ["Python", "Flask", "Bootstrap", "PANDAS", "Sci-Kit"],
    liveUrl: "https://bean-stock.herokuapp.com",
  },
  {
    title: "Club N.O.W.",
    description:
      "Network for the Open Web was founded to bring like-minded tech enthusiasts together. Our goal is to build Open Source projects, help other passionate developers and create a better and fun environment for everyone - together.",
    image: "/projects/now.webp",
    technologies: ["Founder", "Club Captain", "Workshop Speaker"],
    githubUrl: "https://github.com/nowmozillaclub",
    liveUrl: "https://nowmozilla.club",
  },
  {
    title: "Song Match",
    description:
      "An game built as an Alexa skill. Song match asks the users for their favourite artist and some questions and then matches you to a popular song by the artist. Song match uses the Alexa Skills Kit along with MongoDB as the datastore.",
    image: "/projects/songmatch.webp",
    technologies: ["Python", "ASK", "MongoDB"],
    githubUrl: "https://github.com/InfernapeXavier/song-match",
  },
  {
    title: "ACM Connect",
    description:
      "An Android application aimed at decluttering the workspace, ACM Connect was aimed at providing the members of ACM MPSTME with all the tools they will ever need in one package with features like Messaging, User profiles and schedules.",
    image: "/projects/android.webp",
    technologies: ["Java", "Android Studio", "Firebase"],
  },
];
