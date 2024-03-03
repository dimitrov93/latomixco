import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { BadRequestError } from "../errors/bad-request-error";

export const getAllUsersController = async (req: Request, res: Response) => {
  const allUsers = await userService.getAllUsers();
  res
    .status(200)
    .json({ users: allUsers, message: "Users retrieved successfully" });
};

export const getCurrentUserController = async (req: Request, res: Response) => {
  const result = await userService.getCurrentUserService(req);
  res.status(200).json(result);
};

export const editUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userData = req.body;

  await userService.editUserService(userId, userData);

  res.status(200).json({ message: "User updated successfully" });
};

export const changePasswordController = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const loggedUserId = req.currentUser?.id;
  const paramsId = req.params.userId;

  if (loggedUserId !== paramsId) {
    throw new BadRequestError("Not authorized to change this password!");
  }

  await userService.changePasswordService(
    loggedUserId,
    currentPassword,
    newPassword
  );

  res.status(200).json({ message: "Password updated successfully" });
};
