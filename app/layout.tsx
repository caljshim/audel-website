import type { Metadata, Viewport } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

/**
 * The app is set in SF Pro, with SF Pro Rounded and monospaced digits on every
 * figure. Both are system faces on Apple hardware, which is most of the people
 * waiting for an iOS app — these two are the fallback for everyone else.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
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
  themeColor: "#ffffff",
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
      className={`h-full antialiased ${inter.variable} ${nunito.variable}`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
