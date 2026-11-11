import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_BASE_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);

const __dirname = path.resolve();
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const PORT = ENV.PORT || 5001;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, console.log(`Server started on PORT: ${PORT}`));
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
  }
};

startServer();
