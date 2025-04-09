import { drizzle } from "drizzle-orm/node-postgres";

console.log("+++++++++++", process.env.DB_URL);

export const db = drizzle({
  connection: {
    connectionString: process.env.DB_URL,
    // ssl: true,
  },
});
