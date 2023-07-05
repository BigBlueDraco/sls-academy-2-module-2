import express from "express";
import linkRouter from "./src/routers/link.router";

const app = express();

app.use(express.json());
app.use("/", linkRouter);

app.listen("8080", () => {
  console.log("startet on 8080");
});
