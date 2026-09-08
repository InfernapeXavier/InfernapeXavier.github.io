import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-sans",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-mono",
  fallback: ["monospace"],
  adjustFontFallback: true,
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rohitc.tech"),
  title: {
    default: "Rohit Choudhari — Senior Software Engineer",
    template: "%s | Rohit Choudhari",
  },
  description:
    "Infrastructure-leaning Senior Software Engineer building AI developer platforms and production systems, with experience leading cloud migrations and delivering revenue-critical products.",
  keywords: [
    "senior software engineer",
    "backend engineer",
    "infrastructure engineer",
    "platform engineering",
    "AI developer platforms",
    "Kubernetes",
    "AWS",
    "Cloudflare",
    "Ruby on Rails",
    "Rust",
    "Annie-Mei",
    "Rohit Choudhari",
  ],
  authors: [
    { name: "Rohit Choudhari", url: "https://github.com/InfernapeXavier" },
  ],
  creator: "Rohit Choudhari",
  publisher: "Rohit Choudhari",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/assets/favicon/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    { rel: "icon", url: "/assets/favicon/favicon.ico" },
    {
      rel: "icon",
      url: "/assets/favicon/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/assets/favicon/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      url: "/assets/favicon/apple-touch-icon.png",
      sizes: "180x180",
    },
  ],
  openGraph: {
    type: "profile",
    firstName: "Rohit",
    lastName: "Choudhari",
    title: "Rohit Choudhari — Senior Software Engineer",
    description:
      "Backend and infrastructure engineer building AI developer platforms, cloud systems, and revenue-critical products.",
    url: "https://rohitc.tech",
    siteName: "Rohit Choudhari",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Rohit Choudhari — Senior Software Engineer",
    description:
      "Backend and infrastructure engineer building AI developer platforms, cloud systems, and revenue-critical products.",
    creator: "@InfernapeXavier",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <div className="min-h-screen transition-colors duration-300">
            <a href="#main" className="skip-to-content">
              Skip to main content
            </a>
            <Script
              id="schema-org"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Person",
                  name: "Rohit Choudhari",
                  alternateName: ["InfernapeXavier", "SekkenSenzai"],
                  description:
                    "Infrastructure-leaning Senior Software Engineer building AI developer platforms and production systems.",
                  url: "https://rohitc.tech",
                  sameAs: [
                    "https://github.com/InfernapeXavier",
                    "https://linkedin.com/in/infernapexavier/",
                    "https://twitter.com/InfernapeXavier",
                  ],
                  jobTitle: "Senior Software Engineer",
                  worksFor: {
                    "@type": "Organization",
                    name: "Academia.edu",
                    url: "https://www.academia.edu",
                  },
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "University of Florida",
                    url: "https://www.ufl.edu",
                  },
                }),
              }}
            />
            <Navbar />
            <div id="main">{children}</div>
          </div>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
