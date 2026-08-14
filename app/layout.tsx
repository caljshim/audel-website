import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://audel.app"),
  title: "Audel — one AI copilot for your money, goals, and days",
  description:
    "Audel connects your accounts, tracks your goals, and keeps your days on plan — with a private AI copilot that asks before it acts. Coming soon to iOS.",
  keywords: [
    "personal finance",
    "budgeting app",
    "AI copilot",
    "goals tracker",
    "Plaid",
    "iOS finance app",
  ],
  openGraph: {
    title: "Audel — one AI copilot for your money, goals, and days",
    description:
      "Budgeting, goals, and your schedule in one place, with a private AI copilot that asks before it acts. Coming soon to iOS.",
    type: "website",
    siteName: "Audel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audel — one AI copilot for your money, goals, and days",
    description:
      "Budgeting, goals, and your schedule in one place, with a private AI copilot. Coming soon to iOS.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e6051",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Parser-run before paint: marks JS active so reveal animations can hide
            content up front. Without JS the class is absent and everything shows. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
