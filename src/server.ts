import express from "express";
import { PORT } from "../constants";
import "reflect-metadata";
import AppDataSource from "./data-source";
import studentRouter from "./routes/student.route";
import subjectRouter from "./routes/subject.route";
import teacherRouter from "./routes/teacher.route";
import testRouter from "./routes/test.route";

AppDataSource.initialize().then(() => {
	let app = express();
	app.use(express.json());
	app.use("/students", studentRouter);
	app.use("/subject", subjectRouter);
	app.use("/teacher", teacherRouter);
	app.use("/test", testRouter);

	let port = PORT;
	const server = app.listen(port, () => {
		console.clear();
		console.log("===================");
		console.log("Server listen at http://localhost:%s", PORT);
	});
});
