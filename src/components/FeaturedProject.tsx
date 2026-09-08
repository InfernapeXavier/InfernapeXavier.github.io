import Image from "next/image";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import type { Project } from "@/data/projects";

export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div className="featured-frame group aspect-[4/3]">
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          sizes="(min-width: 1440px) 760px, (min-width: 1024px) 55vw, 100vw"
          priority
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-theme-text p-4 font-mono text-xs uppercase tracking-wider text-theme-base">
          <span>Hobby project · 2022—Present</span>
          <span>01</span>
        </div>
      </div>

      <div>
        <p className="eyebrow">Rust · Discord · AI search</p>
        <h3 className="mt-5 text-5xl font-semibold tracking-[-0.055em] md:text-6xl">
          {project.title}
        </h3>
        <p className="mt-7 text-lg leading-relaxed text-theme-subtle">
          {project.longDescription || project.description}
        </p>
        {project.highlights && (
          <ul className="role-highlights mt-8">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span key={technology} className="tag">
              {technology}
            </span>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            <FaGithub aria-hidden="true" /> Source
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="button-secondary"
            >
              <FaExternalLinkAlt aria-hidden="true" /> Add to Discord
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
