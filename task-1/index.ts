import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/routes/index";

import { createTables } from "./src/db/createTables";
dotenv.config();

const app: Express = express();
const port: string | number = process.env.SERVER_PORT || 8080;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
app.use("/", router);

async function start() {
  try {
    await createTables();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
