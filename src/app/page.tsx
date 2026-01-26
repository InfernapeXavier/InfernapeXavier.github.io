import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { projects } from "@/data/projects";
import AnimateOnScroll from "@/components/AnimateOnScroll";

// Lazy load components
const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => (
    <div className="animate-pulse space-y-8">
      <div className="h-8 bg-rose-pine-highlight rounded w-1/3" />
      <div className="h-64 bg-rose-pine-highlight rounded" />
    </div>
  ),
});

const FeaturedProject = dynamic(() => import("@/components/FeaturedProject"), {
  loading: () => (
    <div className="animate-pulse grid lg:grid-cols-2 gap-12">
      <div className="aspect-video bg-rose-pine-highlight rounded-2xl" />
      <div className="space-y-4">
        <div className="h-10 bg-rose-pine-highlight rounded w-1/2" />
        <div className="h-32 bg-rose-pine-highlight rounded" />
      </div>
    </div>
  ),
});

const Skills = dynamic(() => import("@/components/Skills"), {
  loading: () => (
    <div className="animate-pulse">
      <div className="h-8 bg-rose-pine-highlight rounded w-1/4 mb-6" />
      <div className="flex flex-wrap gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-12 h-12 bg-rose-pine-highlight rounded-lg"
          />
        ))}
      </div>
    </div>
  ),
});

const featuredProject = projects.find((p) => p.isFeatured);
const secondaryProjects = projects.filter((p) => p.isSecondary);

export default function Home() {
  return (
    <main className="pt-16 font-sans">
      {/* Hero Section */}
      <section
        id="about"
        className="min-h-screen bg-rose-pine-base flex items-center relative overflow-hidden"
      >
        <div className="floating-shapes" />
        <div className="grid-pattern" />
        <div className="section-container">
          <div className="max-w-4xl relative">
            <h1 className="section-heading">
              Hi, I&apos;m{" "}
              <span className="text-gradient inline-block hover:scale-105 transition-transform cursor-default">
                Rohit
              </span>
            </h1>
            <h2 className="section-subheading">
              Software Engineer · Exploring the edges of infrastructure and
              systems
            </h2>
            <div className="h-0.5 w-1/2 bg-gradient-to-r from-rose-pine-rose to-rose-pine-pine mb-12 opacity-50" />

            <div className="prose space-y-6 animate-fade-in max-w-2xl">
              <p className="text-xl md:text-2xl text-theme-text/85 leading-relaxed">
                I&apos;m fascinated by how things work under the hood—whether
                that&apos;s migrating production systems to Kubernetes, figuring
                out why a database query is slow, or building a Discord bot in
                Rust just to see if I can.
              </p>
              <p className="text-xl md:text-2xl text-theme-text/85 leading-relaxed">
                Currently at{" "}
                <a
                  href="https://www.academia.edu"
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  Academia.edu
                </a>
                , where I&apos;ve spent the last 4+ years working across the
                stack—from payment flows to infrastructure migrations.
              </p>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-4 mt-10 animate-fade-in">
              <a
                href="#experience"
                className="px-5 py-2.5 rounded-xl font-medium bg-theme-surface border border-theme-highlight text-theme-text hover:bg-theme-highlight hover:border-theme-subtle transition-all duration-200"
              >
                See my work
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl font-medium bg-rose-pine-pine/90 dark:bg-rose-pine-pine/90 text-white hover:bg-rose-pine-foam/90 dark:hover:bg-rose-pine-foam/90 transition-all duration-200"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Skills moved below intro */}
          <div className="mt-20 max-w-4xl">
            <Suspense
              fallback={
                <div className="animate-pulse">
                  <div className="h-8 bg-rose-pine-highlight rounded w-1/4 mb-6" />
                  <div className="flex flex-wrap gap-4">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 bg-rose-pine-highlight rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              }
            >
              <Skills />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="min-h-screen bg-rose-pine-surface relative overflow-hidden py-20"
      >
        <div className="floating-shapes" />
        <div className="grid-pattern" />
        <div className="section-container">
          <AnimateOnScroll>
            <h2 className="section-heading mb-4">Experience</h2>
            <p className="text-xl text-theme-subtle mb-12 max-w-2xl">
              Building products and infrastructure at scale
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <div className="max-w-3xl">
              <Suspense
                fallback={
                  <div className="animate-pulse space-y-8">
                    <div className="h-8 bg-rose-pine-highlight rounded w-1/3" />
                    <div className="h-64 bg-rose-pine-highlight rounded" />
                  </div>
                }
              >
                <Experience />
              </Suspense>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Featured Project Section */}
      <section
        id="projects"
        className="min-h-screen bg-rose-pine-base relative overflow-hidden py-20"
      >
        <div className="floating-shapes" />
        <div className="grid-pattern" />
        <div className="section-container">
          <AnimateOnScroll>
            <h2 className="section-heading mb-4">Side Project</h2>
            <p className="text-xl text-theme-subtle mb-12 max-w-2xl">
              What I&apos;m building when I&apos;m not at work
            </p>
          </AnimateOnScroll>
          {featuredProject && (
            <AnimateOnScroll delay={100}>
              <Suspense
                fallback={
                  <div className="animate-pulse grid lg:grid-cols-2 gap-12">
                    <div className="aspect-video bg-rose-pine-highlight rounded-2xl" />
                    <div className="space-y-4">
                      <div className="h-10 bg-rose-pine-highlight rounded w-1/2" />
                      <div className="h-32 bg-rose-pine-highlight rounded" />
                    </div>
                  </div>
                }
              >
                <FeaturedProject project={featuredProject} />
              </Suspense>
            </AnimateOnScroll>
          )}

          {/* Other Projects */}
          {secondaryProjects.length > 0 && (
            <AnimateOnScroll delay={200}>
              <div className="mt-20">
                <h3 className="text-lg font-medium text-theme-subtle mb-6 uppercase tracking-wider">
                  Other Projects
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {secondaryProjects.map((project) => (
                    <a
                      key={project.title}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group block p-6 rounded-xl bg-theme-surface/50 border border-theme-highlight hover:border-theme-subtle hover:bg-theme-surface transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-xl font-semibold text-theme-text group-hover:text-rose-pine-dawn-pine dark:group-hover:text-rose-pine-foam transition-colors">
                            {project.title}
                          </h4>
                          <p className="mt-2 text-theme-text/70 text-sm leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs font-medium rounded-md bg-theme-highlight/50 text-theme-subtle"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <FaGithub className="text-xl text-theme-muted group-hover:text-theme-text transition-colors flex-shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="bg-rose-pine-surface relative overflow-hidden"
      >
        <div className="floating-shapes" />
        <div className="grid-pattern" />
        <div className="section-container py-24">
          <AnimateOnScroll>
            <h2 className="section-heading mb-4">Let&apos;s Talk</h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <div className="flex flex-col space-y-8 max-w-2xl">
              <p className="text-xl text-theme-subtle leading-relaxed">
                I&apos;m always curious about interesting problems, new
                technologies, or opportunities to collaborate. Whether you want
                to chat about infrastructure, Rust, or anything in between—feel
                free to reach out.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:website@rohitc.tech"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-theme-surface border border-theme-highlight text-theme-text hover:bg-theme-highlight hover:border-theme-subtle transition-all duration-200"
                >
                  <FaEnvelope className="text-lg" />
                  <span>Email</span>
                </a>
                <a
                  href="https://github.com/InfernapeXavier"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-theme-surface border border-theme-highlight text-theme-text hover:bg-theme-highlight hover:border-theme-subtle transition-all duration-200"
                >
                  <FaGithub className="text-lg" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/InfernapeXavier"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-theme-surface border border-theme-highlight text-theme-text hover:bg-theme-highlight hover:border-theme-subtle transition-all duration-200"
                >
                  <FaLinkedin className="text-lg" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://twitter.com/InfernapeXavier"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-theme-surface border border-theme-highlight text-theme-text hover:bg-theme-highlight hover:border-theme-subtle transition-all duration-200"
                >
                  <FaTwitter className="text-lg" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
