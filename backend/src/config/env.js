import { config } from "dotenv";

config({ quiet: true });

export const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
}
