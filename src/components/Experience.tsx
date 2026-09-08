import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <div className="experience-shell">
      {experience.map((item) => (
        <div key={item.company}>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-theme-highlight py-7">
            <div>
              <a
                href={item.companyUrl}
                target="_blank"
                rel="noreferrer"
                className="text-3xl font-semibold tracking-tight hover:text-accent md:text-4xl"
              >
                {item.company} ↗
              </a>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-theme-muted">
              {item.duration}
            </p>
          </div>

          {item.roles.map((role) => (
            <article key={role.title} className="role-row">
              <header>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold md:text-2xl">
                    {role.title}
                  </h3>
                  {role.isCurrent && <span className="tag">Now</span>}
                </div>
                {role.period && (
                  <p className="mt-3 font-mono text-sm text-theme-muted">
                    {role.period}
                  </p>
                )}
              </header>
              <div>
                <div className="role-narrative">
                  {role.narrative.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {role.technologies.map((technology) => (
                    <span key={technology} className="tag">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}
