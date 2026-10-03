import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The homepage and the privacy policy are finished static documents in
  // public/. Rewriting before files means they win over app/page.tsx, which is
  // kept in the repo but no longer served.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/home.html" },
        { source: "/privacy", destination: "/privacy.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
