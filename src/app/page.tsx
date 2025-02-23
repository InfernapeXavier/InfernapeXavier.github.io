import Image from "next/image";

export default function Home() {
  return (
    <>
      <section
        id="about"
        className="min-h-screen bg-gray-900 text-white flex items-center"
      >
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi! I&apos;m Rohit
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-400 mb-8">
            And I believe in all things Binary
          </h2>
          <hr className="border-gray-700 mb-8" />

          {/* Mobile version */}
          <div className="md:hidden space-y-4">
            <p>
              I am a Software Engineer at{" "}
              <a
                href="https://www.academia.edu"
                className="text-blue-400 hover:text-blue-300"
              >
                Academia.edu
              </a>
            </p>
            <p>I love solving hard problems with people</p>
            <p>I am fast with tech and I love talking about it</p>
            <p>
              I am currently working on{" "}
              <a
                href="https://github.com/annie-mei"
                className="text-blue-400 hover:text-blue-300"
              >
                Annie Mei
              </a>
              !
            </p>
          </div>

          {/* Desktop version */}
          <div className="hidden md:block font-mono space-y-4">
            <p>
              I am a Software Engineer at{" "}
              <a
                href="https://www.academia.edu"
                className="text-blue-400 hover:text-blue-300"
              >
                Academia.edu
              </a>
            </p>
            <p>I love solving hard problems with people</p>
            <p>I am fast with tech and I love talking about it</p>
            <p>
              I am currently working on{" "}
              <a
                href="https://github.com/annie-mei"
                className="text-blue-400 hover:text-blue-300"
              >
                Annie Mei
              </a>
              !
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          {/* Project cards will go here */}
          <div className="text-gray-400">Coming soon...</div>
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Contact</h2>
          {/* Contact information will go here */}
          <div className="text-gray-400">Coming soon...</div>
        </div>
      </section>
    </>
  );
}
