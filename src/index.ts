import express, { Express } from "express";
import "express-async-errors";
import dotevnv from "dotenv";
dotevnv.config();
import { dbInit } from "./config/initDB";
import { authRoutes } from "./routes/auth.route";
import { userRoutes } from "./routes/user.route";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";
import { rateLimiterMiddleware } from "./middlewares/rate-limiter";
import { loggerMiddleware } from "./middlewares/logger-middleware";


const app: Express = express();
const port = process.env.PORT || 3000;

dbInit();

app.use(loggerMiddleware);
app.use(express.json());
app.use(
  cookieSession({
    signed: true,
    keys: [process.env.SECTER_KEY_ONE!, process.env.SECTER_KEY_TWO!],
  })
);

app.use(rateLimiterMiddleware)
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
