import Location from "./src/controllers/Location.controller.js";
import express from "express";

const app = express();

app.use(express.json());

app.post("/location", Location.findCountry);
app.listen("8080", () => {
  console.log("startet on 8080");
});
