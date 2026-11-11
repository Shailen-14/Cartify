import { Router } from "express";

import {
  signUpUser,
  signInUser,
  signOutUser,
  getMe
} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);
router.post("/sign-out", signOutUser);

router.get("/me", protectRoute, getMe)

export default router;
