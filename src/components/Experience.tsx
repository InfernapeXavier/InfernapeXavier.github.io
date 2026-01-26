"use client";

import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <div className="animate-fade-in">
      {experience.map((exp) => (
        <div key={exp.company} className="relative">
          {/* Company Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noreferrer"
                className="text-2xl md:text-3xl font-semibold text-theme-text hover:text-rose-pine-foam dark:hover:text-rose-pine-foam transition-colors"
              >
                {exp.company}
              </a>
              <span className="text-theme-subtle text-sm">{exp.location}</span>
            </div>
            <p className="text-theme-muted text-sm mt-1">{exp.duration}</p>
          </div>

          {/* Timeline */}
          <div className="relative border-l-2 border-theme-highlight pl-8 space-y-12">
            {exp.roles.map((role) => (
              <div key={role.title} className="relative">
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[41px] w-4 h-4 rounded-full border-2 ${
                    role.isCurrent
                      ? "bg-rose-pine-dawn-pine dark:bg-rose-pine-foam border-rose-pine-dawn-pine dark:border-rose-pine-foam"
                      : "bg-theme-surface border-theme-highlight"
                  }`}
                />

                {/* Role content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-xl font-medium text-theme-text">
                      {role.title}
                    </h4>
                    {role.isCurrent && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-rose-pine-dawn-pine/20 dark:bg-rose-pine-foam/20 text-rose-pine-dawn-pine dark:text-rose-pine-foam border border-rose-pine-dawn-pine/30 dark:border-rose-pine-foam/30">
                        Current
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-4">
                    {role.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-theme-text/80 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-theme-muted"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {role.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-theme-highlight/50 text-theme-subtle border border-theme-highlight"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
