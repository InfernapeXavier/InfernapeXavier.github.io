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
      { name: "Datadog", icon: "/skills/datadog.svg" },
    ],
  },
  {
    name: "Data",
    skills: [
      { name: "PostgreSQL", icon: "/skills/postgresql.svg" },
      { name: "Redis", icon: "/skills/redis.svg" },
      { name: "GraphQL", icon: "/skills/graphql.svg" },
    ],
  },
  {
    name: "Frameworks",
    skills: [
      { name: "Rails", icon: "/skills/rails.svg" },
      { name: "Flask", icon: "/skills/flask.svg" },
      { name: "React", icon: "/skills/react.svg" },
    ],
  },
];

export default function Skills() {
  const { isDark } = useTheme();

  return (
    <div className="rounded-[28px] bg-theme-surface p-6 md:p-8">
      <h3 className="text-lg font-medium text-theme-text mb-7">
        Tech I work with
      </h3>
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
        {skillCategories.map((category) => (
          <div key={category.name}>
            <h4 className="text-xs font-mono text-theme-subtle mb-4">
              {category.name}
            </h4>
            <ul className="space-y-3">
              {category.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="text-theme-text text-sm flex items-center gap-2.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.icon}
                    alt=""
                    width={16}
                    height={16}
                    className={`${
                      isDark
                        ? "brightness-0 invert opacity-70"
                        : "brightness-50 opacity-80"
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
