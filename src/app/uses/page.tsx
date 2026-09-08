import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "Tools, hardware, and software Rohit Choudhari uses for development and daily work.",
};

const uses = [
  {
    title: "Keyboards",
    items: [
      {
        name: "Glorious GMMK Pro",
        detail: "Glorious Pandas, lubed",
        url: "https://www.gloriousgaming.com/products/glorious-gmmk-pro-75-barebone",
      },
      {
        name: "Nuphy Air75 v3",
        detail: "Blush Nano switches",
        url: "https://nuphy.com/collections/air75",
      },
    ],
  },
  {
    title: "Pointers",
    items: [
      {
        name: "Logitech G502 X Lightspeed",
        detail: "Gaming and general use",
        url: "https://www.logitechg.com/products/gaming-mice/g502-x-lightspeed-wireless-mouse.html",
      },
      {
        name: "Logitech MX Master 4",
        detail: "Productivity",
        url: "https://www.logitech.com/products/mice/mx-master-3s.html",
      },
    ],
  },
  {
    title: "Code",
    items: [
      { name: "Cursor", detail: "AI-powered editor", url: "https://cursor.sh" },
      {
        name: "Zed",
        detail: "Fast, collaborative editor",
        url: "https://zed.dev",
      },
      { name: "Warp", detail: "Modern terminal", url: "https://warp.dev" },
      {
        name: "Zsh + Oh My Zsh",
        detail: "Shell and framework",
        url: "https://ohmyz.sh",
      },
    ],
  },
  {
    title: "AI",
    items: [
      {
        name: "AmpCode",
        detail: "Primary agentic coding environment",
        url: "https://ampcode.com",
      },
      {
        name: "Pi",
        detail: "Extensible coding agent harness",
        url: "https://pi.dev/",
      },
      {
        name: "OpenCode",
        detail: "Open source coding agent",
        url: "https://opencode.ai",
      },
    ],
  },
  {
    title: "Thinking",
    items: [
      {
        name: "Bear",
        detail: "Quick notes and writing",
        url: "https://bear.app",
      },
      {
        name: "Notion",
        detail: "Documentation and planning",
        url: "https://notion.so",
      },
    ],
  },
  {
    title: "Audio",
    items: [
      {
        name: "Elgato Wave 3",
        detail: "USB condenser microphone",
        url: "https://www.elgato.com/us/en/p/wave-3-black",
      },
      {
        name: "Beyerdynamic T1 Gen 3",
        detail: "Open-back headphones",
        url: "https://www.beyerdynamic.com/t-1.html",
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <main className="page-shell">
      <div className="section-container">
        <p className="eyebrow">Inventory / Uses</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <h1 className="page-heading">
            Tools should
            <br />
            <span className="text-accent">get out of the way.</span>
          </h1>
          <p className="section-deck">
            A living inventory of the hardware and software that currently earns
            a place in my workflow.
          </p>
        </div>
        <div className="mt-20 grid border-l border-t border-theme-highlight md:grid-cols-2 lg:grid-cols-3">
          {uses.map((category, index) => (
            <section
              key={category.title}
              className="min-h-80 border-b border-r border-theme-highlight p-7"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{category.title}</h2>
                <span className="font-mono text-xs text-theme-muted">
                  0{index + 1}
                </span>
              </div>
              <ul className="mt-10 space-y-7">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold hover:text-accent"
                    >
                      {item.name} ↗
                    </a>
                    <p className="mt-1 text-sm text-theme-muted">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
