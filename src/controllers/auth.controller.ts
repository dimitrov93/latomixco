import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import jwtSign from "../utils/session";

export const registerUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  const user = await authService.registerUserService({
    username,
    email,
    password,
  });

  jwtSign(user, req);

  res.status(201).json(user);
};

export const loginUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  const user = await authService.loginUserService({
    email,
    password,
  });

  jwtSign(user, req);

  res.status(200).json(user);
};

export const logoutUserController = async (req: Request,res: Response): Promise<void> => {
  req.session = null;
  res.status(204).send({});
};
