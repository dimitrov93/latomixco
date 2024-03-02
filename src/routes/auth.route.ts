import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();
import { Request, Response } from "express";
import { User } from "../models/User";

const dataValidation = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long!"),
];

router.post(
  "/register",
  dataValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) throw new BadRequestError("User already registered!");

    const newUser = new User({
      username,
      email,
      password,
    });

    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
);

export { router as authRoutes };
