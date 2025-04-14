import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log("drizzle config", process.env.DB_URL);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
