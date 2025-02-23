export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  isInProgress?: boolean;
}

export const projects: Project[] = [
  {
    title: "Annie Mei",
    description:
      "A Discord bot that provides anime and manga information, with features like search, recommendations, and tracking. Annie Mei is built with Rust, GraphQL, PostgreSQL, and Redis, and is currently serving multiple servers.",
    image: "/projects/annie-mei.webp",
    technologies: ["Rust", "GraphQL", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/InfernapeXavier/annie-mei",
    liveUrl:
      "https://discord.com/oauth2/authorize?client_id=1001234567890&scope=bot&permissions=8",
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
