"use client";

import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  isInProgress?: boolean;
  priority?: boolean;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  isInProgress = false,
  priority = false,
}: ProjectCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="card group animate-fade-in">
      {image && (
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-rose-pine-highlight/50">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
              isImageLoading ? "blur-sm" : "blur-0"
            }`}
            priority={priority}
            onLoad={() => setIsImageLoading(false)}
          />
        </div>
      )}
      <h3 className="text-2xl font-semibold mb-2 text-rose-pine-dawn-pine dark:text-rose-pine-foam flex items-center gap-2">
        {title}
        {isInProgress && (
          <span className="text-sm font-normal px-2 py-1 rounded-full bg-rose-pine-dawn-pine/20 dark:bg-rose-pine-pine/30 text-rose-pine-dawn-pine dark:text-rose-pine-foam">
            In Progress
          </span>
        )}
      </h3>
      <p className="text-rose-pine-subtle text-lg mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-sm rounded-md bg-rose-pine-dawn-pine/10 dark:bg-rose-pine-highlight text-rose-pine-dawn-pine dark:text-rose-pine-foam"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="link flex items-center gap-2"
          >
            <FaGithub className="text-lg" />
            <span>GitHub</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="link flex items-center gap-2"
          >
            <FaExternalLinkAlt className="text-lg" />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
}
