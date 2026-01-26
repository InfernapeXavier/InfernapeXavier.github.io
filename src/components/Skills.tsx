"use client";

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Ruby", "Python", "Rust", "TypeScript", "SQL"],
  },
  {
    name: "Infrastructure",
    skills: ["Kubernetes", "AWS", "Terraform", "Docker", "Cloudflare"],
  },
  {
    name: "Data",
    skills: ["PostgreSQL", "Redis", "GraphQL", "Datadog"],
  },
  {
    name: "Frameworks",
    skills: ["Rails", "Flask", "React", "Next.js"],
  },
];

export default function Skills() {
  return (
    <div className="animate-fade-in">
      <h3 className="text-lg font-medium text-theme-subtle mb-6 uppercase tracking-wider">
        Tech I work with
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skillCategories.map((category) => (
          <div key={category.name}>
            <h4 className="text-sm font-medium text-rose-pine-foam dark:text-rose-pine-foam mb-3">
              {category.name}
            </h4>
            <ul className="space-y-1.5">
              {category.skills.map((skill) => (
                <li key={skill} className="text-theme-text/80 text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
