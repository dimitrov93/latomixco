import express from "express";
import { validateRequest } from "../middlewares/validate-request";
import { registerUserValidation, loginValidation } from "../utils/authHelper";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
} from "../controllers/auth.controller";
const router = express.Router();

router.post(
  "/register",
  registerUserValidation,
  validateRequest,
  registerUserController
);
router.post("/login", loginValidation, validateRequest, loginUserController);
router.post("/logout", validateRequest, logoutUserController);

export { router as authRoutes };
