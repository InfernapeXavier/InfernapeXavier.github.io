import {
  FaArrowRight,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Experience from "@/components/Experience";
import FeaturedProject from "@/components/FeaturedProject";
import Skills from "@/components/Skills";
import { projects } from "@/data/projects";

const featuredProject = projects.find((project) => project.isFeatured);
const secondaryProjects = projects.filter((project) => project.isSecondary);

const education = [
  {
    school: "University of Florida",
    degree: "M.S. Computer Science",
    period: "2019—2021",
  },
  {
    school: "NMIMS",
    degree: "B.Tech. Computer Engineering",
    period: "2015—2019",
  },
];

export default function Home() {
  return (
    <main className="font-sans">
      <section id="about" className="hero-section">
        <div className="editorial-grid" aria-hidden="true" />
        <div className="section-container relative z-10 flex min-h-[calc(100vh-4.5rem)] flex-col justify-center pt-32 md:pt-40">
          <div className="grid items-end gap-12 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <p className="eyebrow mb-6">
                Backend · Infrastructure · AI platforms
              </p>
              <h1 className="hero-title">
                I follow problems
                <span className="block text-accent">all the way down.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-theme-subtle md:text-2xl">
                I&apos;m Rohit Choudhari, a senior software engineer building AI
                developer platforms and production systems—from revenue-critical
                products to cloud infrastructure.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#experience" className="button-primary">
                  Explore my work <FaArrowRight aria-hidden="true" />
                </a>
                <a
                  href="https://bit.ly/rohitcresume"
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary"
                >
                  Read the résumé
                </a>
              </div>
            </div>

            <aside className="status-card">
              <div className="flex items-center gap-2">
                <span className="status-dot" aria-hidden="true" />
                <span className="eyebrow">Currently</span>
              </div>
              <p className="mt-5 text-2xl font-semibold text-theme-text">
                Senior Software Engineer
              </p>
              <a
                href="https://www.academia.edu"
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-lg text-theme-subtle hover:text-theme-text"
              >
                Academia.edu ↗
              </a>
              <div className="rule my-6" />
              <p className="font-mono text-sm uppercase tracking-widest text-theme-muted">
                Production systems · AI developer platforms
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-container grid gap-12 lg:grid-cols-[0.55fr_1fr]">
          <AnimateOnScroll>
            <p className="eyebrow">01 / Approach</p>
            <h2 className="section-heading mt-5">
              I like the
              <br />
              messy middle.
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100} className="self-end">
            <p className="max-w-3xl text-2xl leading-relaxed text-theme-text/90 md:text-3xl">
              I&apos;m happiest with problems that cross boundaries—the ones
              that start as a slow request or an awkward deploy and end up
              somewhere in the database, network, or build pipeline. I like
              tracing them to the root, making the smallest useful change, and
              leaving behind something the next person can understand.
            </p>
            <div className="mt-12">
              <Skills />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section id="experience" className="section-base scroll-mt-24">
        <div className="section-container">
          <AnimateOnScroll>
            <div className="section-intro">
              <div>
                <p className="eyebrow">02 / Experience</p>
                <h2 className="section-heading mt-5">Systems in production.</h2>
              </div>
              <p className="section-deck">
                Building developer platforms, leading infrastructure migrations,
                and shipping features tied directly to the business.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100} className="mt-16">
            <Experience />
          </AnimateOnScroll>
        </div>
      </section>

      <section id="projects" className="section-band scroll-mt-24">
        <div className="section-container">
          <AnimateOnScroll>
            <div className="section-intro">
              <div>
                <p className="eyebrow">03 / Selected work</p>
                <h2 className="section-heading mt-5">
                  Built out of curiosity.
                </h2>
              </div>
              <p className="section-deck">
                These are things I built because I wanted them to exist, or
                because I couldn&apos;t leave a technical question alone.
              </p>
            </div>
          </AnimateOnScroll>

          {featuredProject && (
            <AnimateOnScroll delay={100} className="mt-16">
              <FeaturedProject project={featuredProject} />
            </AnimateOnScroll>
          )}

          {secondaryProjects.length > 0 && (
            <AnimateOnScroll delay={180} className="mt-12">
              <div className="project-list">
                {secondaryProjects.map((project, index) => (
                  <a
                    key={project.title}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-row group"
                  >
                    <span className="font-mono text-sm text-theme-muted">
                      0{index + 2}
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-theme-subtle">
                        {project.description}
                      </p>
                    </div>
                    <span className="ml-auto text-2xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      <section className="section-base">
        <div className="section-container">
          <AnimateOnScroll>
            <p className="eyebrow">04 / Education</p>
            <h2 className="section-heading mt-5">The foundation.</h2>
          </AnimateOnScroll>
          <div className="mt-14 grid border-t border-theme-highlight md:grid-cols-2">
            {education.map((item, index) => (
              <AnimateOnScroll key={item.school} delay={index * 80}>
                <article className="education-card">
                  <p className="font-mono text-sm text-theme-muted">
                    {item.period}
                  </p>
                  <h3 className="mt-8 text-2xl font-semibold">{item.school}</h3>
                  <p className="mt-2 text-lg text-theme-subtle">
                    {item.degree}
                  </p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section scroll-mt-24">
        <div className="section-container">
          <AnimateOnScroll>
            <p className="eyebrow text-current">05 / Contact</p>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="contact-title">Drop me a line.</h2>
                <p className="mt-8 max-w-2xl text-xl opacity-75">
                  Email is the easiest way to reach me. Infrastructure and Rust
                  are safe bets, but it doesn&apos;t have to be about work.
                </p>
              </div>
              <a href="mailto:website@rohitc.tech" className="contact-button">
                <FaEnvelope aria-hidden="true" /> Email me
              </a>
            </div>
            <div className="mt-20 flex flex-wrap gap-x-8 gap-y-4 border-t border-current/20 pt-8 font-mono text-sm uppercase tracking-wider">
              <a
                href="https://github.com/InfernapeXavier"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/InfernapeXavier"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="https://twitter.com/InfernapeXavier"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter /> Twitter
              </a>
              <span className="ml-auto opacity-60">
                © {new Date().getFullYear()} Rohit Choudhari
              </span>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
