import express, { Request, Response } from "express";
const router = express.Router();
import { currentUser } from "../middlewares/current-user";
import { editUserController, getCurrentUser, changePasswordController, getAllUsers } from "../services/user.service";

router.get("/", currentUser, getCurrentUser);
router.get("/all", currentUser, getAllUsers);
router.put("/:userId/edit", currentUser, editUserController);
router.put("/:userId/password", currentUser, changePasswordController);

export { router as userRoutes };
