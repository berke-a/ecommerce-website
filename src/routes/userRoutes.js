import { Router } from "express";
const router = Router();
import {
  loginUser,
  addUser,
  removeUser,
  getUserAttributes,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.post("/login", loginUser);
router.post("/", authMiddleware, addUser);
router.delete("/:username", authMiddleware, removeUser);
router.get("/:_id", authMiddleware, getUserAttributes);

//router.delete("/:id", deleteTask);

export default router;
