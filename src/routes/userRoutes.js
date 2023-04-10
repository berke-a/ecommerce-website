import { Router } from "express";
const router = Router();
import { registerUser, loginUser } from "../controllers/userController.js";
import { requireLogin, requireAdmin } from "../middlewares/authMiddleware.js";

router.post("/", registerUser);
router.post("/login", loginUser);
//router.delete("/:id", deleteTask);

export default router;
