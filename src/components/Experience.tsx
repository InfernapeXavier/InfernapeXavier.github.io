import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <div className="rounded-[28px] bg-theme-surface p-6 md:p-10">
      {experience.map((exp) => (
        <div key={exp.company} className="relative">
          {/* Company Header */}
          <div className="mb-10 border-b border-theme-highlight pb-8">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3>
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl md:text-4xl font-medium tracking-tight text-theme-text hover:underline underline-offset-8"
                >
                  {exp.company}
                </a>
              </h3>
              <span className="text-theme-subtle text-sm">{exp.location}</span>
            </div>
            <p className="text-theme-subtle font-mono text-xs mt-3">
              {exp.duration}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative border-l border-theme-highlight pl-6 md:pl-8 space-y-12">
            {exp.roles.map((role) => (
              <div key={role.title} className="relative">
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[31px] md:-left-[39px] top-2 w-3 h-3 rounded-full border-2 ${
                    role.isCurrent
                      ? "bg-[#8f9fff] border-[#8f9fff]"
                      : "bg-theme-surface border-theme-highlight"
                  }`}
                />

                {/* Role content */}
                <div className="grid lg:grid-cols-[240px_1fr] gap-x-12 gap-y-6">
                  <div className="flex flex-wrap items-start content-start gap-3">
                    <h4 className="w-full text-xl font-medium text-theme-text">
                      {role.title}
                    </h4>
                    {role.period && (
                      <p className="w-full text-xs font-mono leading-relaxed text-theme-subtle">
                        {role.period}
                      </p>
                    )}
                    {role.isCurrent && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-theme-highlight text-theme-text">
                        Current
                      </span>
                    )}
                  </div>

                  <div>
                    <ul className="space-y-4 mb-6">
                      {role.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="text-theme-subtle leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1 before:h-1 before:rounded-full before:bg-theme-subtle"
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
                          className="px-3 py-1.5 text-xs font-medium rounded-full text-theme-subtle border border-theme-highlight"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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
