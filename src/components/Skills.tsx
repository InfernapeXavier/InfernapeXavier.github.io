"use client";

import Image from "next/image";
import { useState } from "react";

interface Skill {
  name: string;
  icon: string;
}

const skills: Skill[] = [
  { name: "Python", icon: "/skills/python.svg" },
  { name: "Rails", icon: "/skills/rails.svg" },
  { name: "Rust", icon: "/skills/rust.svg" },
  { name: "C/C++", icon: "/skills/cplusplus.svg" },
  { name: "Go", icon: "/skills/go.svg" },
  { name: "JavaScript", icon: "/skills/javascript.svg" },
  { name: "TypeScript", icon: "/skills/typescript.svg" },
  { name: "Android", icon: "/skills/android.svg" },
  { name: "MongoDB", icon: "/skills/mongodb.svg" },
  { name: "SQL", icon: "/skills/oracle.svg" },
  { name: "Flask", icon: "/skills/flask.svg" },
  { name: ".NET", icon: "/skills/net.svg" },
  { name: "Redis", icon: "/skills/redis.svg" },
  { name: "Tailwind CSS", icon: "/skills/tailwindcss.svg" },
  { name: "Alexa Skills", icon: "/skills/amazonalexa.svg" },
  { name: "Netlify", icon: "/skills/netlify.svg" },
  { name: "Git", icon: "/skills/git.svg" },
];

export default function Skills() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-semibold mb-6 text-rose-pine-foam">TL;DR</h3>
      <div className="flex flex-wrap gap-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="relative group"
            onMouseEnter={() => setActiveTooltip(skill.name)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className="w-12 h-12 bg-rose-pine-highlight rounded-lg p-2 transition-all duration-300 hover:bg-rose-pine-highlight-med hover:scale-110 relative">
              {/* White version (default) */}
              <div className="absolute inset-0 p-2 transition-opacity duration-300 group-hover:opacity-0">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain brightness-0 invert opacity-50 group-hover:opacity-0"
                />
              </div>
              {/* Colored version (revealed on hover) */}
              <div className="absolute inset-0 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            {activeTooltip === skill.name && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-rose-pine-surface text-rose-pine-text text-sm rounded shadow-lg whitespace-nowrap z-10">
                {skill.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
