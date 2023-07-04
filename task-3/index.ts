import express from "express";
import jsonRouter from "./src/routers/json.router";

const app = express();

app.use(express.json());
app.use("/", jsonRouter);

app.listen("8080", () => {
  console.log("startet on 8080");
});
