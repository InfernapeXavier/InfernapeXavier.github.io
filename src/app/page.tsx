import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { FiArrowDown, FiArrowUpRight, FiDatabase } from "react-icons/fi";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Experience from "@/components/Experience";
import FeaturedProject from "@/components/FeaturedProject";
import Skills from "@/components/Skills";
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
          Software Engineer · Exploring the edges of infrastructure and systems
        </p>
        <p className={styles.current}>
          Currently at{" "}
          <a href="https://www.academia.edu" target="_blank" rel="noreferrer">
            Academia.edu
          </a>
          , where I&apos;ve spent the last 4+ years working across the
          stack—from payment flows to infrastructure migrations.
        </p>
        <div className={styles.actions}>
          <a href="#experience" className={styles.primaryLink}>
            See my work <FiArrowDown aria-hidden="true" />
          </a>
          <a href="#contact" className={styles.textLink}>
            Get in touch <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
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
                Side Project
                <span className={styles.accent} aria-hidden="true">
                  ↘
                </span>
              </h2>
            </div>
            <p>What I&apos;m building when I&apos;m not at work</p>
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

      <section className={styles.about} aria-labelledby="about-title">
        <AnimateOnScroll className={styles.aboutCopy}>
          <span className={styles.eyebrow}>02 / Under the hood</span>
          <h2 id="about-title">
            A little about me
            <span className={styles.accent} aria-hidden="true">
              .
            </span>
          </h2>
          <p>
            I&apos;m fascinated by how things work under the hood—whether
            that&apos;s migrating production systems to Kubernetes, figuring out
            why a database query is slow, or building a Discord bot in Rust just
            to see if I can.
          </p>
          <span className={styles.aboutFlower} aria-hidden="true">
            ✳
          </span>
        </AnimateOnScroll>
        <AnimateOnScroll delay={100}>
          <Skills />
        </AnimateOnScroll>
      </section>

      <section
        id="experience"
        className={styles.experience}
        aria-labelledby="experience-title"
      >
        <AnimateOnScroll>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>03 / The day job</span>
              <h2 id="experience-title">
                Experience
                <span className={styles.accent} aria-hidden="true">
                  ↗
                </span>
              </h2>
            </div>
            <p>Building products and infrastructure at scale</p>
          </div>
          <Experience />
        </AnimateOnScroll>
      </section>

      <section
        id="contact"
        className={styles.contact}
        aria-labelledby="contact-title"
      >
        <AnimateOnScroll>
          <span className={styles.eyebrow}>04 / Say hello</span>
          <div className={styles.contactHeading}>
            <h2 id="contact-title">Let&apos;s Talk</h2>
            <span aria-hidden="true">↗</span>
          </div>
          <p>
            I&apos;m always curious about interesting problems, new
            technologies, or opportunities to collaborate. Whether you want to
            chat about infrastructure, Rust, or anything in between—feel free to
            reach out.
          </p>
          <div className={styles.socials}>
            <a href="mailto:website@rohitc.tech">
              <FaEnvelope aria-hidden="true" /> Email{" "}
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
