import type { NextConfig } from "next";

// Use a dummy DB_URL during build time
const DB_URL =
  process.env.DB_URL || "postgresql://dummy:dummy@localhost:5432/dummy";

const nextConfig: NextConfig = {
  output: "standalone",
  publicRuntimeConfig: {
    // These will be available at runtime on both client and server
    nodeEnv: process.env.NODE_ENV,
  },
  serverRuntimeConfig: {
    // These will only be available on the server side
    dbUrl: process.env.DB_URL,
    nodeEnv: process.env.NODE_ENV,
  },
};

export default nextConfig;
