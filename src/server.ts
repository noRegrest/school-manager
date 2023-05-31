import express from "express";
import { PORT } from "../constants";
import "reflect-metadata";
import AppDataSource from "./data-source";
import studentRouter from "./routes/student.route";

AppDataSource.initialize().then(() => {
  let app = express();
  app.use(express.json());
  app.use("/api/v1/students", studentRouter);

  let port = PORT;
  const server = app.listen(port, () => {
    console.clear();
    console.log("===================");
    console.log("Server listen at http://localhost:%s", PORT);
  });
});
