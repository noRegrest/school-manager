import express from "express";
import {
	addStudentHandler,
	addSubjectHandler,
	deleteStudentHandler,
	deleteSubjectHandler,
	getAllSubjectHandler,
	getOneSubjectHandler,
	getStudentHandler,
	updateSubjectHandler,
} from "../controller/common/subject.controller";

const subjectRouter = express.Router();

subjectRouter.post("/get", getAllSubjectHandler);
subjectRouter.post("/get/:Code", getOneSubjectHandler);
subjectRouter.post("/add", addSubjectHandler);
subjectRouter.post("/update", updateSubjectHandler);
subjectRouter.post("/delete", deleteSubjectHandler);

subjectRouter.post("/add-student", addStudentHandler);
subjectRouter.post("/del-student", deleteStudentHandler);
subjectRouter.post("/get-student", getStudentHandler);

export default subjectRouter;
