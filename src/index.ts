import express, { Express, Request, Response } from "express";
import dotevnv from "dotenv";
import { dbInit } from "./config/initDB";
dotevnv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


dbInit();
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
