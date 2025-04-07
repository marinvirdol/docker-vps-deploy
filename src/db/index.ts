import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  throw new Error("DB_URL is not set");
}

export const db = drizzle({
  connection: {
    connectionString: process.env.DB_URL,
    // ssl: true,
  },
});
