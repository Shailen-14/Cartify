import { Router } from "express";

import {
  getAllItemsFromCart,
  addItemToCart,
  deleteItemFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, getAllItemsFromCart);
router.post("/:productId", protectRoute, addItemToCart);
router.delete("/:productId", protectRoute, deleteItemFromCart);
router.delete("/", protectRoute, clearCart);

export default router;
