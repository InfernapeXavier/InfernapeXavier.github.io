import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <section
        id="about"
        className="min-h-screen bg-rose-pine-base flex items-center"
      >
        <div className="section-container">
          <h1 className="section-heading">
            Hi! I&apos;m <span className="text-gradient">Rohit</span>
          </h1>
          <h2 className="section-subheading">
            And I believe in all things Binary
          </h2>
          <div className="h-px bg-gradient-to-r from-rose-pine-rose to-rose-pine-pine mb-8" />

          <div className="prose prose-invert space-y-4 animate-fade-in">
            <p className="text-lg text-rose-pine-text">
              I am a Software Engineer at{" "}
              <a href="https://www.academia.edu" className="link">
                Academia.edu
              </a>
            </p>
            <p className="text-lg text-rose-pine-text">
              I love solving hard problems with people
            </p>
            <p className="text-lg text-rose-pine-text">
              I am fast with tech and I love talking about it
            </p>
            <p className="text-lg text-rose-pine-text">
              I am currently working on{" "}
              <a href="https://github.com/annie-mei" className="link">
                Annie Mei
              </a>
              !
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen bg-rose-pine-surface">
        <div className="section-container">
          <h2 className="section-heading">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project cards will go here */}
            <div className="card animate-fade-in">
              <h3 className="text-xl font-semibold mb-2 text-rose-pine-foam">
                Coming Soon...
              </h3>
              <p className="text-rose-pine-subtle">
                Exciting projects are in the works!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-rose-pine-base">
        <div className="section-container">
          <h2 className="section-heading">Let&apos;s Connect</h2>
          <div className="flex flex-col items-center space-y-8 animate-fade-in">
            <p className="text-xl text-rose-pine-subtle text-center max-w-2xl">
              I&apos;m always interested in hearing about new opportunities,
              collaborations, or just having a chat about technology.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://github.com/InfernapeXavier"
                target="_blank"
                rel="noreferrer"
                className="button flex items-center space-x-2"
              >
                <FaGithub className="text-xl" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/rohitc3"
                target="_blank"
                rel="noreferrer"
                className="button flex items-center space-x-2"
              >
                <FaLinkedin className="text-xl" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/InfernapeXavier"
                target="_blank"
                rel="noreferrer"
                className="button flex items-center space-x-2"
              >
                <FaTwitter className="text-xl" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
