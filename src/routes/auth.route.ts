import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
import * as authService from "../services/auth.service";
import { registerUserValidation, loginValidation } from "../utils/authHelper";
const router = express.Router();

import jwtSign from "../utils/session";


router.post("/register", registerUserValidation, validateRequest, async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = await authService.register(username, email, password);

    jwtSign(user, req);

    res.status(201).json(user);
  }
);

router.post("/login", loginValidation, validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await authService.login(email, password);

    jwtSign(user, req);

    res.status(200).send(user);
  }
);

router.post("/logout", (req: Request, res: Response) => {
  req.session = null;

  res.send({});
});

export { router as authRoutes };
