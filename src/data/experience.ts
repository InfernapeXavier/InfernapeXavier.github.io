export interface Role {
  title: string;
  period?: string;
  isCurrent?: boolean;
  narrative: string[];
  technologies: string[];
}

export interface Experience {
  company: string;
  companyUrl: string;
  duration: string;
  roles: Role[];
}

export const experience: Experience[] = [
  {
    company: "Academia.edu",
    companyUrl: "https://www.academia.edu",
    duration: "August 2021—Present",
    roles: [
      {
        title: "Senior Software Engineer",
        period: "July 2025—Present",
        isCurrent: true,
        narrative: [
          "My current work sits at the intersection of developer experience and production infrastructure. I built sandboxed AI development environments that cut startup times in half and made the platform useful beyond engineering, then developed reusable tooling to help teams adopt AI-assisted development without every workflow becoming a one-off experiment.",
          "On the infrastructure side, I helped move production workloads to Kubernetes by building migration tooling and supporting phased rollouts, reducing deploy times by 50%. I also led our move from CloudFront to Cloudflare's DNS, WAF, and CDN for systems handling 2,000 requests per second, while remaining closely involved in on-call response across the application, database, networking, and infrastructure layers.",
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
        period: "August 2021—July 2025",
        narrative: [
          "I joined Academia.edu working close to the product, building payment flows and monetization features tied directly to revenue. Automating the rough edges around those systems reduced customer support work by 25%, and deploying Tailscale gave teams a consistent, secure way to reach services running in AWS.",
          "Over time, the role pulled me deeper into platform and data problems. I built an agentic workflow that turned research pseudocode into production-grade Python, tuned database and backend performance to lower system load, and created reusable ingestion tooling for more than 200 million metadata records—making later corpus imports three times faster.",
        ],
        technologies: ["Ruby on Rails", "Python", "PostgreSQL", "Redis", "AWS"],
      },
    ],
  },
];
