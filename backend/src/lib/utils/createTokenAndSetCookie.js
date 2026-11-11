import jwt from "jsonwebtoken";

import { ENV } from "../../config/env.js";

export const createTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("auth-token", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
