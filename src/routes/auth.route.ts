import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
import * as authService from "../services/authService";
import { registerUserValidation, loginValidation } from "../utils/authHelper";
const router = express.Router();
import jwt from "jsonwebtoken";
import { currentUser } from "../middlewares/current-user";

router.get("/", currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

router.post(
  "/register",
  registerUserValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = await authService.register(username, email, password);

    const userJWT = jwt.sign(
      {
        id: user?.id,
        email: user?.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(201).json(user);
  }
);

router.post(
  "/login",
  loginValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await authService.login(email, password);

    const userJWT = jwt.sign(
      {
        id: user?.id,
        email: user?.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(200).send(user);
  }
);


router.post('/logout', (req: Request, res: Response) => {
  req.session = null

  res.send({})
})

export { router as authRoutes };
