import { drizzle } from "drizzle-orm/node-postgres";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const dbUrl = serverRuntimeConfig.dbUrl;

console.log("+++++++++++", dbUrl);

export const db = drizzle({
  connection: {
    connectionString: dbUrl,
    // ssl: true,
  },
});
