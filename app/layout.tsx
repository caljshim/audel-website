import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  themeColor: "#eef1ee",
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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
