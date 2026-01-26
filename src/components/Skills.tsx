"use client";

import { useTheme } from "@/contexts/ThemeContext";

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Ruby", icon: "/skills/ruby.svg" },
      { name: "Python", icon: "/skills/python.svg" },
      { name: "Rust", icon: "/skills/rust.svg" },
      { name: "TypeScript", icon: "/skills/typescript.svg" },
      { name: "SQL", icon: "/skills/postgresql.svg" },
    ],
  },
  {
    name: "Infrastructure",
    skills: [
      { name: "Kubernetes", icon: "/skills/kubernetes.svg" },
      { name: "AWS", icon: "/skills/aws.svg" },
      { name: "Terraform", icon: "/skills/terraform.svg" },
      { name: "Docker", icon: "/skills/docker.svg" },
      { name: "Cloudflare", icon: "/skills/cloudflare.svg" },
    ],
  },
  {
    name: "Data",
    skills: [
      { name: "PostgreSQL", icon: "/skills/postgresql.svg" },
      { name: "Redis", icon: "/skills/redis.svg" },
      { name: "GraphQL", icon: "/skills/graphql.svg" },
      { name: "Datadog", icon: "/skills/datadog.svg" },
    ],
  },
  {
    name: "Frameworks",
    skills: [
      { name: "Rails", icon: "/skills/rails.svg" },
      { name: "Flask", icon: "/skills/flask.svg" },
      { name: "React", icon: "/skills/react.svg" },
      { name: "Next.js", icon: "/skills/nextdotjs.svg" },
    ],
  },
];

export default function Skills() {
  const { isDark } = useTheme();

  return (
    <div className="animate-fade-in">
      <h3 className="text-lg font-medium text-theme-subtle mb-6 uppercase tracking-wider">
        Tech I work with
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skillCategories.map((category) => (
          <div key={category.name}>
            <h4 className="text-sm font-medium text-rose-pine-dawn-pine dark:text-rose-pine-foam mb-3">
              {category.name}
            </h4>
            <ul className="space-y-2">
              {category.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="text-theme-text/80 text-sm flex items-center gap-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    width={16}
                    height={16}
                    className={`${
                      isDark ? "brightness-0 invert opacity-70" : "opacity-80"
                    }`}
                  />
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
