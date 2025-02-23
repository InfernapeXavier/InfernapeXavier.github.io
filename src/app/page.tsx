import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <section
        id="about"
        className="min-h-screen bg-rose-pine-base flex items-center"
      >
        <div className="section-container">
          <div className="max-w-4xl">
            <h1 className="section-heading">
              Hi! I&apos;m{" "}
              <span className="text-gradient inline-block hover:scale-105 transition-transform cursor-default">
                Rohit
              </span>
            </h1>
            <h2 className="section-subheading">
              And I believe in all things{" "}
              <span className="font-mono text-rose-pine-foam">Binary</span>
            </h2>
            <div className="h-0.5 w-1/4 bg-gradient-to-r from-rose-pine-rose to-rose-pine-pine mb-12 opacity-50" />

            <div className="prose prose-invert space-y-6 animate-fade-in">
              <p className="text-lg text-rose-pine-text/90">
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
              <p className="text-lg text-rose-pine-text/90">
                I love solving hard problems with people
              </p>
              <p className="text-lg text-rose-pine-text/90">
                I am fast with tech and I love talking about it
              </p>
              <p className="text-lg text-rose-pine-text/90">
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
        </div>
      </section>

      <section id="projects" className="min-h-screen bg-rose-pine-surface">
        <div className="section-container">
          <h2 className="section-heading mb-12">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card group animate-fade-in">
              <h3 className="text-2xl font-semibold mb-4 text-rose-pine-foam">
                Coming Soon...
              </h3>
              <p className="text-rose-pine-subtle text-lg">
                Exciting projects are in the works!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-rose-pine-base">
        <div className="section-container">
          <h2 className="section-heading mb-12">Let&apos;s Connect</h2>
          <div className="flex flex-col items-center space-y-12 animate-fade-in">
            <p className="text-2xl text-rose-pine-subtle text-center max-w-2xl font-light tracking-wide">
              I&apos;m always interested in hearing about new opportunities,
              collaborations, or just having a chat about technology.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
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
                href="https://linkedin.com/in/rohitc3"
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
    </>
  );
}
