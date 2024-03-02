import { body } from "express-validator";

export const registerUserValidation = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long!"),
];