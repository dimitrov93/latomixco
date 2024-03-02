import express, { Express, Request, Response } from "express";
import "express-async-errors";
import dotevnv from "dotenv";
import { dbInit } from "./config/initDB";
import { authRoutes } from "./routes/auth.route"; 
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
dotevnv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(`METHOD: ${req.method} >> PATH: ${req.path}`);
  next();
});

dbInit();
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
app.use(express.json());

app.use("/api/auth", authRoutes);

app.all("*", async (req, res) => {
    throw new NotFoundError();
  });
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
