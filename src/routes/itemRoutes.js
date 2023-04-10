import { Router } from "express";
const router = Router();
import {
  createItem,
  getItemById,
  getItemsByCategory,
  createReview,
} from "../controllers/itemController.js";
import {
  requireLogin,
  requireAdmin,
  authMiddleware,
} from "../middlewares/authMiddleware.js";

router.post("/", authMiddleware, createItem);
router.post("/:id/reviews", authMiddleware, createReview);
router.get("/", getItemsByCategory);
router.get("/:id", authMiddleware, getItemById);

export default router;
