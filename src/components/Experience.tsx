import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <div className="rounded-[28px] bg-theme-surface p-6 md:p-10">
      <div className="mb-8 border-b border-theme-highlight pb-8">
        <h3>
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noreferrer"
            className="text-2xl md:text-4xl font-medium tracking-tight text-theme-text hover:underline underline-offset-8"
          >
            {experience.company}
          </a>
        </h3>
        <p className="mt-3 text-theme-subtle">{experience.role}</p>
        <p className="mt-2 text-xs font-mono text-theme-subtle">
          {experience.tenure}
        </p>
        <p className="mt-5 max-w-3xl leading-relaxed text-theme-subtle">
          {experience.introduction}
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
        {experience.stories.map((story) => (
          <article key={story.title}>
            <h4 className="text-xl font-medium leading-snug text-theme-text">
              {story.title}
            </h4>
            <p className="mt-4 leading-relaxed text-theme-subtle">
              {story.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
