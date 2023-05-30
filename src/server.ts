import express from "express";
import { PORT } from "../constants";
import "reflect-metadata";
import AppDataSource from "./data-source";

AppDataSource.initialize().then(() => {
  let app = express();
  // app.use("/api/v1/students", studentRouter);

  let port = PORT;
  const server = app.listen(port, () => {
    console.clear();
    console.log("Server listen at http://localhost:%s", PORT);
  });
});
