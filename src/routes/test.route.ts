import express from "express";
import {
	addTestHandler,
	deleteTestHandler,
	getAllTestHandler,
	getOneTestHandler,
	updateTestHandler,
} from "../controller/common/test.controller";

const testRouter = express.Router();

testRouter.post("/get", getAllTestHandler);
testRouter.post("/get/:Code", getOneTestHandler);
testRouter.post("/add", addTestHandler);
testRouter.post("/update", updateTestHandler);
testRouter.post("/delete", deleteTestHandler);

export default testRouter;
