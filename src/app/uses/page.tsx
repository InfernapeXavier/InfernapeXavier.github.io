import { Metadata } from "next";
import {
  FaKeyboard,
  FaMouse,
  FaCode,
  FaTerminal,
  FaRobot,
  FaStickyNote,
  FaEnvelope,
  FaMicrophone,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Uses | Rohit Choudhari",
  description:
    "The tools, hardware, and software I use for development and daily work.",
};

interface UsesItem {
  name: string;
  description?: string;
  url?: string;
}

interface UsesCategory {
  title: string;
  icon: React.ReactNode;
  items: UsesItem[];
}

const uses: UsesCategory[] = [
  {
    title: "Keyboards",
    icon: <FaKeyboard />,
    items: [
      {
        name: "Glorious GMMK Pro",
        description: "With Glorious Pandas (lubed)",
        url: "https://www.gloriousgaming.com/products/glorious-gmmk-pro-75-barebone",
      },
      {
        name: "Nuphy Air75 v3",
        description: "Blush Nano switches",
        url: "https://nuphy.com/collections/air75",
      },
    ],
  },
  {
    title: "Mice",
    icon: <FaMouse />,
    items: [
      {
        name: "Logitech G502 X Lightspeed",
        description: "For gaming and general use",
        url: "https://www.logitechg.com/products/gaming-mice/g502-x-lightspeed-wireless-mouse.html",
      },
      {
        name: "Logitech MX Master 4",
        description: "For productivity",
        url: "https://www.logitech.com/products/mice/mx-master-3s.html",
      },
    ],
  },
  {
    title: "Editor",
    icon: <FaCode />,
    items: [
      {
        name: "Cursor",
        description: "AI-powered VS Code fork",
        url: "https://cursor.sh",
      },
      {
        name: "Zed",
        description: "Blazing fast because Rust",
        url: "https://zed.dev",
      },
    ],
  },
  {
    title: "Terminal",
    icon: <FaTerminal />,
    items: [
      {
        name: "Warp",
        description: "Modern terminal with AI",
        url: "https://warp.dev",
      },
      {
        name: "Zsh + Oh My Zsh",
        description: "Shell and framework",
        url: "https://ohmyz.sh",
      },
    ],
  },
  {
    title: "AI Tools",
    icon: <FaRobot />,
    items: [
      {
        name: "OpenCode",
        description: "With Claude Opus or GPT Codex",
        url: "https://opencode.ai",
      },
    ],
  },
  {
    title: "Notes",
    icon: <FaStickyNote />,
    items: [
      {
        name: "Bear",
        description: "Quick notes and writing",
        url: "https://bear.app",
      },
      {
        name: "Notion",
        description: "Documentation and planning",
        url: "https://notion.so",
      },
    ],
  },
  {
    title: "Audio",
    icon: <FaMicrophone />,
    items: [
      {
        name: "Elgato Wave 3",
        description: "USB condenser microphone",
        url: "https://www.elgato.com/us/en/p/wave-3-black",
      },
      {
        name: "Beyerdynamic T1 Gen 3",
        description: "Tesla open-back headphones",
        url: "https://www.beyerdynamic.com/t-1.html",
      },
    ],
  },
  {
    title: "Email",
    icon: <FaEnvelope />,
    items: [
      {
        name: "Spark",
        description: "Smart email client",
        url: "https://sparkmailapp.com",
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <main className="pt-16 font-sans">
      <section className="min-h-screen bg-rose-pine-base relative overflow-hidden">
        <div className="floating-shapes" />
        <div className="grid-pattern" />
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="section-heading mb-4">/uses</h1>
            <p className="text-xl text-theme-subtle mb-12">
              The tools and gear I use for development and daily work.
            </p>

            <div className="space-y-12">
              {uses.map((category) => (
                <div key={category.title}>
                  <h2 className="flex items-center gap-3 text-xl font-semibold text-rose-pine-dawn-pine dark:text-rose-pine-foam mb-6">
                    <span className="text-lg">{category.icon}</span>
                    {category.title}
                  </h2>
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="p-4 rounded-xl bg-theme-surface/50 border border-theme-highlight hover:border-theme-subtle transition-colors"
                      >
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-theme-text font-medium hover:text-rose-pine-dawn-pine dark:hover:text-rose-pine-foam transition-colors"
                          >
                            {item.name}
                          </a>
                        ) : (
                          <span className="text-theme-text font-medium">
                            {item.name}
                          </span>
                        )}
                        {item.description && (
                          <p className="text-theme-subtle text-sm mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
