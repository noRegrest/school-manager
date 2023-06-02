import { Request, Response } from "express";
import {
	addTest,
	deleteTest,
	findOneTest,
	findTestAll,
	updateTest,
} from "../../services/test.service";
import { validate } from "../../../validate";
import { ResMessageCommon } from "../../../constants";
import { ResponseData } from "../../schemas/common.schema";
import { Test } from "../../entities/test";
import { findOneTeacher } from "../../services/teacher.service";
export const getAllTestHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var result = await findTestAll();

		return res.json({
			...response,
			...result,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			...response,
			message: ResMessageCommon.somethingWentWrong,
		});
	}
};
export const getOneTestHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var requestData = req.params;
		var valid = validate(requestData, {
			Code: { type: "string", required: true, max: 255 },
		});

		if (valid.status == false) {
			return res.json({
				...response,
				message: valid.errors[0],
			});
		}

		requestData = valid.data;
		var result = await findOneTest({ Code: requestData.Code });
		return res.json({
			...response,
			...result,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: false,
			message: ResMessageCommon.failed,
		});
	}
};
export const addTestHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var requestData = req.body;
		const valid = validate(requestData, {
			Code: { type: "string", required: true, max: 255 },
			Description: { type: "string", max: 255 },
			TeacherCode: { type: "string", required: true, max: 255 },
		});

		if (!valid.status) {
			return res.json({
				...response,
				message: valid.errors[0],
			});
		}

		var test = await findOneTest({ Code: valid.data.Code });
		if (test.data) {
			return res.json({
				...response,
				message: ResMessageCommon.duplicate,
			});
		}
		var teacher = await findOneTeacher({ Code: valid.data.TeacherCode });

		if (!teacher.data) {
			return res.json({
				...response,
				message: ResMessageCommon.noneExist,
			});
		}
		var temp: Partial<Test> = {
			Teachers: teacher.data,
			Code: valid.data.Code,
			Description: valid.data.Description,
		};
		var result = await addTest({ ...temp });
		return res.json({
			...response,
			...result,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: false,
			message: ResMessageCommon.somethingWentWrong,
		});
	}
};
export const updateTestHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var requestData = req.body;
		const valid = validate(requestData, {
			Code: { type: "string", required: true, max: 255 },
			NewCode: { type: "string", required: true, max: 255 },
			TeacherCode: { type: "string", required: true, max: 255 },
			Description: { type: "string", max: 255 },
		});

		if (!valid.status) {
			return res.json({
				...response,
				message: valid.errors[0],
			});
		}

		var test = await findOneTest({ Code: valid.data.Code });
		var teacher = await findOneTeacher({ Code: valid.data.TeacherCode });
		if (!test.data || !teacher.data) {
			return res.json({
				...response,
				message: ResMessageCommon.noneExist,
			});
		}

		requestData = {
			Id: test.data.Id,
			Code: valid.data.NewCode,
			Teachers: teacher.data,
			Description: valid.data.Description,
		};
		valid.data;
		var result = await updateTest({ ...requestData });
		return res.json({
			...response,
			...result,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: false,
			message: ResMessageCommon.somethingWentWrong,
		});
	}
};
export const deleteTestHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var requestData = req.body;
		const valid = validate(requestData, {
			Code: { type: "string", required: true, max: 255 },
		});

		if (!valid.status) {
			return res.json({
				...response,
				message: valid.errors[0],
			});
		}

		var test = await findOneTest({ Code: valid.data.Code });
		if (!test.data) {
			return res.json({
				...response,
				message: ResMessageCommon.noneExist,
			});
		}

		requestData = {
			Id: test.data.Id,
		};
		valid.data;
		var result = await deleteTest({ ...requestData });
		return res.json({
			...response,
			...result,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: false,
			message: ResMessageCommon.somethingWentWrong,
		});
	}
};
