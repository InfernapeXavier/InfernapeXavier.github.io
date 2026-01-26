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
    duration: "4+ years",
    roles: [
      {
        title: "Senior Software Engineer",
        isCurrent: true,
        highlights: [
          "Led production migration to Kubernetes—writing migration tooling, supporting phased rollouts, and cutting deploy times by 50%",
          "Prototyped Cloudflare Edge stack (DNS, WAF, CDN) as a CloudFront replacement, shaping long-term infrastructure direction",
          "Built a custom Slack MCP integration to streamline platform workflows and boost engineering productivity",
          "Partnered with infrastructure vendors on cost-reduction initiatives, balancing performance, reliability, and spend",
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
        highlights: [
          "Built and maintained revenue-critical payment flows and monetization features contributing directly to core business revenue",
          "Drove deployment of Tailscale, standardizing secure internal service access to AWS-hosted systems",
          "Developed an agentic workflow to translate research pseudocode into production-grade Python, accelerating experimentation",
          "Optimized database queries and backend performance to reduce system load and lower operational costs",
          "Designed a reusable library for large-scale data imports, reducing effort for future corpus expansion",
        ],
        technologies: ["Ruby on Rails", "Python", "PostgreSQL", "Redis", "AWS"],
      },
    ],
  },
];
