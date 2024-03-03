import { User } from "../models/User";
import { BadRequestError } from "../errors/bad-request-error";
import bcrypt from "bcrypt";

interface userAttrs {
  username?: string;
  email: string;
  password: string;
  id?: string;
}

export const registerUserService = async ({
  username,
  email,
  password,
}: userAttrs): Promise<userAttrs | null> => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("User already registered!");
  }

  const newUser = new User({
    username,
    email,
    password,
  });

  const savedUser = await newUser.save();

  return savedUser;
};

interface LoginParams {
  email: string;
  password: string;
}

export const loginUserService = async ({
  email,
  password,
}: LoginParams): Promise<userAttrs | null> => {
  const existingUser = await User.findOne({ email });

  if (!existingUser)
    throw new BadRequestError("User with this email does not exist!");

  const isValid = await bcrypt.compare(password, existingUser.password);

  if (!isValid) throw new BadRequestError("Password is incorrect!");

  return existingUser;
};
