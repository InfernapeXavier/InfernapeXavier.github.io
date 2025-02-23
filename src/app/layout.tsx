import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
    default: "Rohit Choudhari - Infrastructure Engineer at Academia.edu",
    template: "%s | Rohit Choudhari",
  },
  description:
    "Rohit Choudhari is an Infrastructure Engineer at Academia.edu, specializing in building scalable systems with Ruby, Python, and Terraform. Creator of Annie-Mei, a Discord bot for anime/manga tracking.",
  keywords: [
    "infrastructure engineer",
    "software engineer",
    "ruby developer",
    "python developer",
    "terraform",
    "infrastructure as code",
    "rust developer",
    "academia.edu",
    "university of florida",
    "annie-mei",
    "discord bot",
    "InfernapeXavier",
    "SekkenSenzai",
    "rohit choudhari",
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
    { rel: "icon", url: "/favicon.ico" },
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
    title: "Rohit Choudhari - Infrastructure Engineer at Academia.edu",
    description:
      "Rohit Choudhari is an Infrastructure Engineer at Academia.edu, specializing in building scalable systems with Ruby, Python, and Terraform. Creator of Annie-Mei, a Discord bot for anime/manga tracking.",
    url: "https://rohitc.tech",
    siteName: "Rohit Choudhari's Portfolio",
    locale: "en_US",
    images: [
      {
        url: "https://rohitc.tech/assets/logo/cover.png",
        width: 1200,
        height: 630,
        alt: "Rohit Choudhari - Infrastructure Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Choudhari - Infrastructure Engineer at Academia.edu",
    description:
      "Rohit Choudhari is an Infrastructure Engineer at Academia.edu, specializing in building scalable systems with Ruby, Python, and Terraform. Creator of Annie-Mei, a Discord bot for anime/manga tracking.",
    creator: "@InfernapeXavier",
    images: ["https://rohitc.tech/assets/logo/cover.png"],
  },
  verification: {
    google: "your-google-site-verification", // You'll need to add this
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
      </head>
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
                    "Infrastructure Engineer at Academia.edu, specializing in building scalable systems with Ruby, Python, and Terraform.",
                  image: "https://rohitc.tech/assets/logo/cover.png",
                  url: "https://rohitc.tech",
                  sameAs: [
                    "https://github.com/InfernapeXavier",
                    "https://linkedin.com/in/infernapexavier/",
                    "https://twitter.com/InfernapeXavier",
                  ],
                  jobTitle: "Infrastructure Engineer",
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
            <main
              id="main"
              className="transition-opacity duration-300 animate-fade-in"
            >
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
