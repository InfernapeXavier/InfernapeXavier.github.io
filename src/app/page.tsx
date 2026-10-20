import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiDatabase,
  FiGrid,
} from "react-icons/fi";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Experience from "@/components/Experience";
import FeaturedProject from "@/components/FeaturedProject";
import Skills from "@/components/Skills";
import { education } from "@/data/education";
import { projects } from "@/data/projects";
import styles from "./home.module.css";

const featuredProject = projects.find((project) => project.isFeatured);
const secondaryProjects = projects.filter((project) => project.isSecondary);

export default function Home() {
  return (
    <div className={styles.home}>
      <section id="about" className={styles.hero} aria-labelledby="intro-title">
        <div className={styles.orbits} aria-hidden="true">
          <span />
          <span />
          <span className={styles.spark}>✳</span>
        </div>
        <h1 id="intro-title">
          Hi, I&apos;m{" "}
          <span>
            Rohit
            <span className={styles.hello} aria-hidden="true">
              .
            </span>
          </span>
        </h1>
        <p className={styles.subtitle}>
          I work on AI platforms and developer tools.
        </p>
        <p className={styles.current}>
          Lately, that&apos;s meant building environments for AI-assisted
          coding, writing internal tools, and looking after the infrastructure
          they run on.
        </p>
        <p className={styles.current}>
          Senior Software Engineer at{" "}
          <a href="https://www.academia.edu" target="_blank" rel="noreferrer">
            Academia.edu
          </a>
          .
        </p>
        <div className={styles.actions}>
          <a href="#experience" className={styles.primaryLink}>
            See my work <FiArrowDown aria-hidden="true" />
          </a>
          <a href="#contact" className={styles.textLink}>
            Get in touch <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <p className={styles.current}>
          Off the clock? <Link href="/anime">Explore my anime atlas ↗</Link>
        </p>
      </section>

      <section
        id="projects"
        className={styles.projects}
        aria-labelledby="projects-title"
      >
        <AnimateOnScroll>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>01 / Outside the day job</span>
              <h2 id="projects-title">
                Side quests
                <span className={styles.accent} aria-hidden="true">
                  ↘
                </span>
              </h2>
            </div>
            <p>A couple of things I work on outside my job.</p>
          </div>
        </AnimateOnScroll>
        <div className={styles.projectGrid}>
          {featuredProject && (
            <AnimateOnScroll>
              <FeaturedProject project={featuredProject} />
            </AnimateOnScroll>
          )}
          {secondaryProjects.length > 0 && (
            <div className={styles.secondaryProjects}>
              <h3 className={styles.eyebrow}>Other Projects</h3>
              {secondaryProjects.map((project) => (
                <AnimateOnScroll key={project.title} delay={100}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.secondaryCard}
                  >
                    <div className={styles.cardTop}>
                      <span className={styles.cardLabel}>
                        02 / From scratch
                      </span>
                      <FiArrowUpRight aria-hidden="true" />
                    </div>
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <div className={styles.databaseArt} aria-hidden="true">
                      <FiDatabase />
                      <span />
                      <span />
                    </div>
                    <div className={styles.cardBottom}>
                      <div className={styles.tags}>
                        {project.technologies.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                      <span>
                        View Source <FiArrowUpRight aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      <section
        id="experience"
        className={styles.experience}
        aria-labelledby="experience-title"
      >
        <AnimateOnScroll>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>02 / The day job</span>
              <h2 id="experience-title">
                What I work on
                <span className={styles.accent} aria-hidden="true">
                  ↗
                </span>
              </h2>
            </div>
          </div>
          <Experience />
          <div className="mt-6">
            <Skills />
          </div>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm leading-relaxed text-theme-subtle">
            <p>
              {education.map((qualification, index) => (
                <span key={qualification.institution}>
                  {index > 0 && " · "}
                  {qualification.degree} at {qualification.institution}
                </span>
              ))}
            </p>
            <a
              href="https://bit.ly/rohitcresume"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-theme-text underline underline-offset-4"
            >
              Full résumé <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </AnimateOnScroll>
      </section>

      <section
        id="contact"
        className={styles.contact}
        aria-labelledby="contact-title"
      >
        <AnimateOnScroll>
          <span className={styles.eyebrow}>03 / Say hello</span>
          <div className={styles.contactHeading}>
            <h2 id="contact-title">Say hi</h2>
            <span aria-hidden="true">↗</span>
          </div>
          <div className={styles.socials}>
            <a href="mailto:website@rohitc.tech">
              <FaEnvelope aria-hidden="true" /> Email{" "}
              <FiArrowUpRight aria-hidden="true" />
            </a>
            <a
              href="https://links.rohitc.tech"
              target="_blank"
              rel="noreferrer"
            >
              <FiGrid aria-hidden="true" /> Bento{" "}
              <FiArrowUpRight aria-hidden="true" />
            </a>
            <a
              href="https://github.com/InfernapeXavier"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub aria-hidden="true" /> GitHub{" "}
              <FiArrowUpRight aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com/in/InfernapeXavier"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin aria-hidden="true" /> LinkedIn{" "}
              <FiArrowUpRight aria-hidden="true" />
            </a>
            <a
              href="https://twitter.com/InfernapeXavier"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter aria-hidden="true" /> Twitter{" "}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </AnimateOnScroll>
      </section>
      <footer className={styles.footer}>
        <span>Rohit Choudhari</span>
        <a href="#about">Back to top ↑</a>
      </footer>
    </div>
  );
}
