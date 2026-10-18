const skillCategories = [
  {
    name: "For building with AI",
    description:
      "Sandboxed development environments, agentic workflows, and reusable tooling. Less setup, more building.",
  },
  {
    name: "For making the tools",
    description:
      "Python and Ruby for backend services and workflows. Rust when I want to dig deeper—including Annie-Mei's Gemini integration.",
  },
  {
    name: "For keeping it running",
    description:
      "AWS, Kubernetes, Terraform, and Cloudflare. Production infrastructure is part of the platform, not an afterthought.",
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
