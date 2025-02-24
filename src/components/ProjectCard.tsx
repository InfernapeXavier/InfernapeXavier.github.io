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

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`card group animate-fade-in ${isFocused ? "ring-2 ring-rose-pine-foam" : ""}`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role="article"
      aria-labelledby={`project-title-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {image && (
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-rose-pine-highlight/50">
          <Image
            src={image}
            alt={`Screenshot or preview of ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
              isImageLoading ? "blur-2xl scale-110" : "blur-0 scale-100"
            }`}
            priority={priority}
            onLoad={() => setIsImageLoading(false)}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            quality={90}
          />
        </div>
      )}
      <h3
        id={`project-title-${title.toLowerCase().replace(/\s+/g, "-")}`}
        className="text-2xl font-semibold mb-2 text-rose-pine-dawn-pine dark:text-rose-pine-foam flex items-center gap-2"
      >
        {title}
        {isInProgress && (
          <span
            className="text-sm font-normal px-2 py-1 rounded-full bg-rose-pine-dawn-pine/20 dark:bg-rose-pine-pine/30 text-rose-pine-dawn-pine dark:text-rose-pine-foam"
            role="status"
          >
            In Progress
          </span>
        )}
      </h3>
      <p className="text-rose-pine-subtle text-lg mb-4">{description}</p>
      <div
        className="flex flex-wrap gap-2 mb-4"
        role="list"
        aria-label="Technologies used"
      >
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-sm rounded-md bg-rose-pine-dawn-pine/10 dark:bg-rose-pine-highlight text-rose-pine-dawn-pine dark:text-rose-pine-foam"
            role="listitem"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4" role="group" aria-label="Project links">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="link flex items-center gap-2"
            aria-label={`View ${title} source code on GitHub (opens in new tab)`}
          >
            <FaGithub className="text-lg" aria-hidden="true" />
            <span>GitHub</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="link flex items-center gap-2"
            aria-label={`View ${title} live demo (opens in new tab)`}
          >
            <FaExternalLinkAlt className="text-lg" aria-hidden="true" />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
}
