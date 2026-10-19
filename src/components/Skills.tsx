const skillCategories = [
  {
    name: "Languages",
    description:
      "Mostly Python and Ruby at work. Rust for Annie-Mei and other side projects.",
  },
  {
    name: "Infrastructure",
    description:
      "AWS, Kubernetes, Terraform, and Cloudflare. Datadog for monitoring and debugging.",
  },
  {
    name: "Data and APIs",
    description:
      "PostgreSQL and Redis. AniList's GraphQL API and Gemini for the bot.",
  },
];

export default function Skills() {
  return (
    <div className="rounded-[28px] bg-theme-surface p-6 md:p-8">
      <h3 className="text-lg font-medium text-theme-text mb-7">What I use</h3>
      <dl className="space-y-6">
        {skillCategories.map((category) => (
          <div key={category.name}>
            <dt className="text-xs font-mono text-theme-text mb-2">
              {category.name}
            </dt>
            <dd className="text-sm leading-relaxed text-theme-subtle">
              {category.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
