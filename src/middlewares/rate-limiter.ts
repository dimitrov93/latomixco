import rateLimit from "express-rate-limit";

import { NextFunction, Request, Response } from "express";

const limiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 10,
  message: "Too many requests sent from this IP, please try again later",
});

export const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  limiter(req, res, (err) => {
    if (err) {
      return res.status(429).json({ error: err.message });
    }
    next()
  });
};
