import express from "express";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import * as authService from "../services/authService";
import { registerUserValidation } from "../utils/authHelper";
const router = express.Router();

import { Request, Response } from "express";
import { User } from "../models/User";

router.post(
  "/register",
  registerUserValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = await authService.register(username, email, password);

    res.status(201).json(user);
  }
);

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.login(email, password);
  res.status(200).send(user);
});

export { router as authRoutes };
