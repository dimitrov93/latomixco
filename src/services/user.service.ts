import { User } from "../models/User";
import { BadRequestError } from "../errors/bad-request-error";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  try {
    const allUsers = await User.find();
    return allUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new BadRequestError("Error fetching users from DB!");
  }
};

export const getCurrentUserService = async (req: Request) => {
  return { currentUser: req.currentUser || null };
};

export const editUserService = async (userId: string, userData: any) => {
  if (userData.password) {
    throw new BadRequestError("Password update not authorized!");
  }

  const updatedUser = await User.updateOne(
    { _id: userId },
    { $set: userData },
    { new: true }
  );

  if (!updatedUser) {
    throw new BadRequestError("User not found");
  }

  return "User is updated";
};

export const changePasswordService = async (
  loggedUserId: string,
  currentPassword: string,
  newPassword: string
) => {
  const existingUser = await User.findById(loggedUserId);

  if (!existingUser) {
    throw new BadRequestError("User with this id does not exist!");
  }

  const isValid = await bcrypt.compare(
    currentPassword.trim(),
    existingUser.password
  );

  if (!isValid) {
    throw new BadRequestError("Password is incorrect!");
  }

  const saltRounds = parseInt(process.env.SALT_ROUNDS || "", 10) || 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  await User.updateOne(
    { _id: loggedUserId },
    { $set: { password: hashedPassword } },
    { new: true }
  );

  return "Password is updated!";
};
