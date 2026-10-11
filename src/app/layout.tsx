import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmed Kamel — Software Developer | Interactive 3D Portfolio",
  description:
    "Portfolio of Ahmed Kamel: Software developer based in Alexandria, Egypt. Focused on web architecture, interactive 3D applications, and connected systems.",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#080B10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${instrumentSans.variable} font-body selection:bg-accent/25`}
    >
      <body className="bg-bg text-ink min-h-screen flex flex-col antialiased">
        {/* Accessible Skip Link */}
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-bg focus:font-mono focus:text-xs focus:rounded-sm focus:outline-none"
        >
          Skip to work
        </a>

        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
