import express from "express";
import {
	addTeacherHandler,
	deleteTeacherHandler,
	getAllTeacherHandler,
	getOneTeacherHandler,
	updateTeacherHandler,
} from "../controller/common/teacher.controller";

const teacherRouter = express.Router();

teacherRouter.post("/get", getAllTeacherHandler);
teacherRouter.post("/get/:Code", getOneTeacherHandler);
teacherRouter.post("/add", addTeacherHandler);
teacherRouter.post("/update", updateTeacherHandler);
teacherRouter.post("/delete", deleteTeacherHandler);

export default teacherRouter;
