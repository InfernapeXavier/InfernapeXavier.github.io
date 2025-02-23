import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
});

const monacode = localFont({
  src: "../fonts/MonaCode-Regular.woff2",
  display: "swap",
  variable: "--font-monacode",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rohitc.tech"),
  title: "Rohit Choudhari (academia.edu)",
  description:
    "Rohit Choudhari is a Software Engineer at Academia.edu. He completed his MS in CS from the University of Florida. His interests are databases. He is currently working on Annie-Mei, a discord bot that gives you anime/manga information. Find him around the web as InfernapeXavier!",
  keywords:
    "developer, uf graduate, rohit, choudhari, InfernapeXavier, software engineer, full-stack engineer, academia.edu",
  authors: [{ name: "InfernapeXavier" }],
  openGraph: {
    type: "profile",
    firstName: "Rohit",
    lastName: "Choudhari",
    title: "Rohit Choudhari",
    description:
      "Rohit Choudhari is a Software Engineer at Academia.edu. He completed his MS in CS from the University of Florida. His interests are databases. He is currently working on Annie-Mei, a discord bot that gives you anime/manga information. Find him around the web as InfernapeXavier!",
    images: [
      {
        url: "https://rohitc.tech/assets/logo/cover.png",
        width: 1200,
        height: 630,
        alt: "Rohit Choudhari",
      },
    ],
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
      className={`${inter.variable} ${monacode.variable} scroll-smooth`}
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicon/apple-touch-icon.png"
        />
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
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
      </head>
      <body>
        <div className={`${inter.className} font-sans antialiased`}>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
