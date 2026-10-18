export interface Role {
  title: string;
  period?: string;
  isCurrent?: boolean;
  highlights: string[];
  technologies: string[];
}

export interface Experience {
  company: string;
  companyUrl: string;
  location: string;
  duration: string;
  roles: Role[];
}

export const experience: Experience[] = [
  {
    company: "Academia.edu",
    companyUrl: "https://www.academia.edu",
    location: "San Francisco, CA",
    duration: "August 2021 – Present",
    roles: [
      {
        title: "Senior Software Engineer",
        period: "July 2025 – Present",
        isCurrent: true,
        highlights: [
          "Built sandboxed AI development environments, cutting startup times by 50% and extending access beyond engineering.",
          "Developed reusable tooling for a sustainable software factory, standardizing AI-assisted development across teams.",
          "Developed migration tooling and supported phased rollouts for a production migration to Kubernetes, reducing deploy times by 50%.",
          "Led the migration from CloudFront to Cloudflare Edge services (DNS, WAF, CDN) for systems serving 2,000 requests per second.",
          "Led production on-call incident response across application, database, networking, and infrastructure layers.",
        ],
        technologies: [
          "Kubernetes",
          "AWS",
          "Cloudflare",
          "Docker",
          "Terraform",
        ],
      },
      {
        title: "Software Engineer",
        period: "August 2021 – July 2025",
        highlights: [
          "Built and automated revenue-critical payment flows and monetization features, reducing customer support workload by 25%.",
          "Drove the deployment of Tailscale and standardized internal service access, enabling secure connectivity to AWS-hosted systems.",
          "Developed an agentic workflow to translate research pseudocode into production-grade Python implementations, accelerating experimentation.",
          "Optimized database queries and backend performance to reduce system load and lower operational costs.",
          "Built reusable ingestion tooling for 200M+ metadata records, accelerating future corpus imports by 3×.",
        ],
        technologies: ["Ruby on Rails", "Python", "PostgreSQL", "Redis", "AWS"],
      },
    ],
  },
];
