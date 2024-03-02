import express, { Express, Request, Response } from "express";
import dotevnv from "dotenv";

dotevnv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
