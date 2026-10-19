import Image from "next/image";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { FiArrowUpRight, FiPlus } from "react-icons/fi";
import type { Project } from "@/data/projects";
import styles from "./FeaturedProject.module.css";

interface FeaturedProjectProps {
  project: Project;
}

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <article className={styles.card}>
      <div className={styles.status}>
        <span>01 / Featured project</span>
        {project.isInProgress && (
          <span>
            <i aria-hidden="true" />
            Active project
          </span>
        )}
      </div>
      <div className={styles.intro}>
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className={styles.art}>
          <span className={styles.spark} aria-hidden="true">
            ✳
          </span>
          <div className={styles.image}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1100px) 330px, (min-width: 768px) 45vw, 85vw"
              className="object-cover"
            />
          </div>
          <span className={styles.discord} aria-hidden="true">
            <FaDiscord />
          </span>
        </div>
      </div>
      <div className={styles.tags}>
        {project.technologies.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className={styles.links}>
        <a href={project.githubUrl} target="_blank" rel="noreferrer">
          <FaGithub aria-hidden="true" />
          View Source
          <FiArrowUpRight aria-hidden="true" />
        </a>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Visit Website
            <FiArrowUpRight aria-hidden="true" />
          </a>
        )}
      </div>
      <details className={styles.story}>
        <summary>
          More about the bot <FiPlus aria-hidden="true" />
        </summary>
        <div>
          <p>{project.longDescription || project.description}</p>
          {project.highlights && (
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}
        </div>
      </details>
    </article>
  );
}
