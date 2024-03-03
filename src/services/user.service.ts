import { User } from "../models/User";
import { BadRequestError } from "../errors/bad-request-error";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
};

export const getCurrentUser = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export const editUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (req.body.password)
    throw new BadRequestError("Password update not authorized!");

  const updatedUser = await User.updateOne(
    { _id: userId },
    { $set: req.body },
    { new: true }
  );

  if (!updatedUser) {
    res.status(404).json({ error: "User not found" });
  }

  res.status(200).json("User is updated");
};

export const changePasswordController = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  const loggedUserId = req.currentUser?.id;
  const paramsId = req.params.userId;

  if (loggedUserId !== paramsId)
    throw new BadRequestError("Not authorized to change this password!");

  const existingUser = await User.findById(loggedUserId);

  if (!existingUser)
    throw new BadRequestError("User with this id does not exist!");

  const isValid = await bcrypt.compare(
    currentPassword.trim(),
    existingUser.password
  );

  if (!isValid) throw new BadRequestError("Password is incorrect!");

  const saltRounds = parseInt(process.env.SALT_ROUNDS || "", 10) || 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  await User.updateOne(
    { _id: loggedUserId },
    { $set: { password: hashedPassword } },
    { new: true }
  );

  res.status(201).json({ message: "Password is updated!" });
};
