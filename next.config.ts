import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Apple reads this file to let www.audel.ai links open the Audel app (Plaid's
  // bank sign-in and Stripe's checkout both return through them). It has no
  // extension, so say what it is.
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
  // The homepage and the privacy policy are finished static documents in
  // public/. Rewriting before files means they win over app/page.tsx, which is
  // kept in the repo but no longer served.
  //
  // The app's pages (from goals-app/site, 2026-10-16): where Plaid returns
  // after a bank sign-in, where Stripe returns after checkout or the billing
  // portal, and the terms and support pages Checkout and the app link to.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/home.html" },
        { source: "/privacy", destination: "/privacy.html" },
        // Washington's My Health My Data Act wants the consumer health data
        // policy as its own page, linked from the homepage on its own.
        { source: "/privacy/health", destination: "/privacy-health.html" },
        { source: "/terms", destination: "/terms.html" },
        // A plain-language guide to the arbitration section, linked from the
        // app's opt-out row (2026-10-26).
        { source: "/terms/arbitration", destination: "/terms-arbitration.html" },
        { source: "/support", destination: "/support.html" },
        { source: "/plaid", destination: "/plaid.html" },
        { source: "/plaid/:path*", destination: "/plaid.html" },
        { source: "/billing/success", destination: "/billing-success.html" },
        { source: "/billing/cancelled", destination: "/billing-cancelled.html" },
        { source: "/billing/return", destination: "/billing-return.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
