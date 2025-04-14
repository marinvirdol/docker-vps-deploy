import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Use DB_URL from environment, or fall back to local development URL
const dbUrl = process.env.DB_URL ?? "";

console.log("Using database URL:", dbUrl.replace(/:[^:@]+@/, ":***@")); // Log URL without password

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});
