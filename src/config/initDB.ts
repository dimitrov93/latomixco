const mongoose = require("mongoose");
import dotevnv from "dotenv";
dotevnv.config();

const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

if (!MONGO_USERNAME || !MONGO_PASSWORD) {
  throw new Error("MongoDB configuration missing");
}

const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.qcksyuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const dbInit = () => {
  mongoose.Promise = Promise;
  mongoose.connect(mongoURL as string);

  return mongoose.connection.on("open", () => console.log("DB is connected!"));
};
