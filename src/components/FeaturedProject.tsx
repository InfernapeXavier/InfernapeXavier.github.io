"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import type { Project } from "@/data/projects";

interface FeaturedProjectProps {
  project: Project;
}

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Image */}
      <div className="relative group">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-theme-surface border border-theme-highlight">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-base/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {project.isInProgress && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-rose-pine-gold/90 dark:bg-rose-pine-gold/90 text-rose-pine-base rounded-full text-sm font-medium">
            In Progress
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-theme-text mb-4">
            {project.title}
          </h3>
          <p className="text-lg text-theme-text/80 leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Highlights */}
        {project.highlights && (
          <ul className="space-y-2">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-3 text-theme-text/70">
                <span className="text-rose-pine-foam dark:text-rose-pine-foam mt-1.5">
                  ▹
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-sm font-medium rounded-lg bg-theme-highlight/50 text-theme-subtle border border-theme-highlight"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-theme-surface border border-theme-highlight text-theme-text hover:bg-theme-highlight hover:border-theme-subtle transition-all duration-200"
          >
            <FaGithub className="text-lg" />
            <span>View Source</span>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-rose-pine-pine/90 dark:bg-rose-pine-pine/90 text-white hover:bg-rose-pine-foam/90 dark:hover:bg-rose-pine-foam/90 transition-all duration-200"
            >
              <FaExternalLinkAlt className="text-sm" />
              <span>Add to Discord</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
