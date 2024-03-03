import express from "express";
const router = express.Router();
import { currentUser } from "../middlewares/current-user";
import { getAllUsersController, getCurrentUserController, editUserController, changePasswordController } from "../controllers/user.controller";

router.get("/", currentUser, getCurrentUserController);
router.get("/all", currentUser, getAllUsersController);
router.put("/:userId/edit", currentUser, editUserController);
router.put("/:userId/password", currentUser, changePasswordController);

export { router as userRoutes };
