import type { NextConfig } from "next";

const IUBENDA_PRIVACY = "https://www.iubenda.com/privacy-policy/98533713";
const IUBENDA_COOKIE = "https://www.iubenda.com/privacy-policy/98533713/cookie-policy";

const nextConfig: NextConfig = {
  // Allow Sanity Studio's internal SVG sprites
  images: {
    dangerouslyAllowSVG: true,
  },
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: IUBENDA_PRIVACY,
        permanent: false,
      },
      {
        source: "/cookie",
        destination: IUBENDA_COOKIE,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
