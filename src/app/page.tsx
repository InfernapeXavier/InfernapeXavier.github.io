import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { projects } from "@/data/projects";

// Lazy load components that are not immediately visible
const ProjectCard = dynamic(() => import("@/components/ProjectCard"), {
  loading: () => (
    <div className="card animate-pulse">
      <div className="w-full h-48 bg-rose-pine-highlight rounded-lg mb-4" />
      <div className="h-8 bg-rose-pine-highlight rounded w-3/4 mb-4" />
      <div className="h-24 bg-rose-pine-highlight rounded mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-20 bg-rose-pine-highlight rounded" />
        <div className="h-6 w-20 bg-rose-pine-highlight rounded" />
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

export default function Home() {
  return (
    <main className="pt-16 font-sans">
      <section
        id="about"
        className="min-h-screen bg-rose-pine-base flex items-center relative overflow-hidden"
      >
        <div className="floating-shapes" />
        <div className="grid-pattern" />
        <div className="section-container">
          <div className="max-w-4xl relative">
            <h1 className="section-heading">
              Hi! I&apos;m{" "}
              <span className="text-gradient inline-block hover:scale-105 transition-transform cursor-default">
                Rohit
              </span>
            </h1>
            <h2 className="section-subheading">
              And I bring ideas to life with{" "}
              <span className="font-mono text-rose-pine-dawn-pine dark:text-rose-pine-foam">
                code
              </span>
            </h2>
            <div className="h-0.5 w-1/4 bg-gradient-to-r from-rose-pine-rose to-rose-pine-pine mb-12 opacity-50" />

            <div className="prose prose-invert space-y-6 animate-fade-in">
              <p className="text-3xl font-medium text-rose-pine-text/90">
                I am a Software Engineer at{" "}
                <a
                  href="https://www.academia.edu"
                  className="link inline-flex items-center group"
                >
                  Academia.edu
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </p>
              <p className="text-3xl font-medium text-rose-pine-text/90">
                I love solving hard problems with people
              </p>
              <p className="text-3xl font-medium text-rose-pine-text/90">
                I am fast with tech and I love talking about it
              </p>
              <p className="text-3xl font-medium text-rose-pine-text/90">
                I am currently working on{" "}
                <a
                  href="https://github.com/annie-mei"
                  className="link font-mono inline-flex items-center group"
                >
                  Annie Mei
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
                !
              </p>
            </div>
          </div>

          <div className="mt-24 max-w-4xl">
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

      <section
        id="projects"
        className="min-h-screen bg-rose-pine-surface relative overflow-hidden"
      >
        <div className="floating-shapes" />
        <div className="grid-pattern" />
        <div className="section-container">
          <h2 className="section-heading mb-12">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Suspense
                key={project.title}
                fallback={
                  <div className="card animate-pulse">
                    <div className="w-full h-48 bg-rose-pine-highlight rounded-lg mb-4" />
                    <div className="h-8 bg-rose-pine-highlight rounded w-3/4 mb-4" />
                    <div className="h-24 bg-rose-pine-highlight rounded mb-4" />
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 w-20 bg-rose-pine-highlight rounded" />
                      <div className="h-6 w-20 bg-rose-pine-highlight rounded" />
                    </div>
                  </div>
                }
              >
                <ProjectCard {...project} priority={index < 3} />
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="min-h-screen bg-rose-pine-base relative overflow-hidden"
      >
        <div className="floating-shapes" />
        <div className="grid-pattern" />
        <div className="section-container">
          <h2 className="section-heading mb-12">Let&apos;s Connect</h2>
          <div className="flex flex-col space-y-12 animate-fade-in max-w-2xl">
            <p className="text-2xl text-rose-pine-subtle font-light tracking-wide">
              I&apos;m always interested in hearing about new opportunities,
              collaborations, or just having a chat about technology.
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="mailto:website@rohitc.tech"
                className="button flex items-center space-x-3"
              >
                <FaEnvelope className="text-2xl" />
                <span>Email</span>
              </a>
              <a
                href="https://github.com/InfernapeXavier"
                target="_blank"
                rel="noreferrer"
                className="button flex items-center space-x-3"
              >
                <FaGithub className="text-2xl" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/InfernapeXavier"
                target="_blank"
                rel="noreferrer"
                className="button flex items-center space-x-3"
              >
                <FaLinkedin className="text-2xl" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/InfernapeXavier"
                target="_blank"
                rel="noreferrer"
                className="button flex items-center space-x-3"
              >
                <FaTwitter className="text-2xl" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
