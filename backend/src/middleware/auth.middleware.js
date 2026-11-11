import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies["auth-token"];

  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorised, no token provided" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorised, invalid or expired token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(`Error in protectRoute middleware: ${error.message}`);
    next(error.message);
  }
};
