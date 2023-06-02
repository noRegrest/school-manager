import express from "express";
import {
	addStudentHandler,
	deleteStudentHandler,
	getAllStudentHandler,
	getOneStudentHandler,
	updateStudentHandler,
} from "../controller/common/student.controller";

const studentRouter = express.Router();

studentRouter.post("/get", getAllStudentHandler);
studentRouter.post("/get/:Code", getOneStudentHandler);
studentRouter.post("/add", addStudentHandler);
studentRouter.post("/update", updateStudentHandler);
studentRouter.post("/delete", deleteStudentHandler);

export default studentRouter;
