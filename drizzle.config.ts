import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // url: process.env.DB_URL!,
    url: "postgresql://postgres:MyPassword123@91.99.3.185:5432/todos",
  },
});
