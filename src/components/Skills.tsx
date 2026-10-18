const skillCategories = [
  {
    name: "For getting things done",
    description:
      "Ruby, Python, and SQL. Rails and PostgreSQL are familiar territory.",
  },
  {
    name: "For going a little deeper",
    description:
      "Rust. From a Discord bot to a database, it's where I go to dig into how things work.",
  },
  {
    name: "For keeping it running",
    description:
      "AWS, Kubernetes, Terraform, and Cloudflare. The foundations underneath the fun stuff.",
  },
];

export default function Skills() {
  return (
    <div className="rounded-[28px] bg-theme-surface p-6 md:p-8">
      <h3 className="text-lg font-medium text-theme-text mb-7">
        Things I reach for
      </h3>
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
