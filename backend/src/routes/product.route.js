import { Router } from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/product.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", protectRoute, createProduct);
router.put("/:id", protectRoute, updateProductById);
router.delete("/:id", protectRoute, deleteProductById);

export default router;
