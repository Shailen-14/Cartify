import mongoose from "mongoose";
import { setServers } from "node:dns/promises";

import { ENV } from "./env.js";

setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async () => {
  if (!ENV.MONGO_URI) {
    console.error(`MONGO_URI not set in environment variables`);
  }

  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log(
      `Successfully connected to MongoDB database: ${conn.connection.host}`,
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB database: ${error.message}`);
    process.exit(1); // exit with status of 1 (failure)
  }
};
