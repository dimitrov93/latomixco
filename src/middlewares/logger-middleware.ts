import { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`METHOD: ${req.method} >> PATH: ${req.path}`);
  next();
};
