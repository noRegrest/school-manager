import { Request, Response } from "express";
import {
	addTeacher,
	deleteTeacher,
	findOneTeacher,
	findTeacherAll,
	updateTeacher,
} from "../../services/teacher.service";
import { validate } from "../../../validate";
import { ResMessageCommon } from "../../../constants";
import { ResponseData } from "../../schemas/common.schema";
import { Teacher } from "../../entities/teacher";
import { findOneSubject } from "../../services/subject.service";
export const getAllTeacherHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var result = await findTeacherAll();

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
export const getOneTeacherHandler = async (req: Request, res: Response) => {
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
		var result = await findOneTeacher({ Code: requestData.Code });
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
export const addTeacherHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var requestData = req.body;
		const valid = validate(requestData, {
			Name: { type: "string", required: true, max: 255 },
			WorkStartDate: { type: "date" },
			Code: { type: "string", required: true, max: 255 },
			SubjectCode: { type: "string", required: true, max: 255 },
		});

		if (!valid.status) {
			return res.json({
				...response,
				message: valid.errors[0],
			});
		}

		var teacher = await findOneTeacher({ Code: valid.data.Code });
		if (teacher.data) {
			return res.json({
				...response,
				message: ResMessageCommon.duplicate,
			});
		}
		var subject = await findOneSubject({ Code: valid.data.SubjectCode });

		if (!subject.data) {
			return res.json({
				...response,
				message: ResMessageCommon.noneExist,
			});
		}
		var temp: Partial<Teacher> = {
			Subjects: subject.data,
			Code: valid.data.Code,
			Name: valid.data.Name,
			WorkStartDate: valid.data.WorkStartDate,
		};
		var result = await addTeacher({ ...temp });
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
export const updateTeacherHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var requestData = req.body;
		const valid = validate(requestData, {
			Code: { type: "string", required: true, max: 255 },
			NewCode: { type: "string", required: true, max: 255 },
			Name: { type: "string", required: true, max: 255 },
			SubjectCode: { type: "string", required: true, max: 255 },
			WorkStartDate: { type: "date" },
		});

		if (!valid.status) {
			return res.json({
				...response,
				message: valid.errors[0],
			});
		}

		var teacher = await findOneTeacher({ Code: valid.data.Code });
		var subject = await findOneSubject({ Code: valid.data.SubjectCode });
		if (!teacher.data || !subject.data) {
			return res.json({
				...response,
				message: ResMessageCommon.noneExist,
			});
		}

		requestData = {
			Id: teacher.data.Id,
			Code: valid.data.NewCode,
			Name: valid.data.Name,
			Subjects: subject.data,
			WorkStartDate: valid.data.WorkStartDate,
		};
		valid.data;
		var result = await updateTeacher({ ...requestData });
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
export const deleteTeacherHandler = async (req: Request, res: Response) => {
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

		var teacher = await findOneTeacher({ Code: valid.data.Code });
		if (!teacher.data) {
			return res.json({
				...response,
				message: ResMessageCommon.noneExist,
			});
		}

		requestData = {
			Id: teacher.data.Id,
		};
		valid.data;
		var result = await deleteTeacher({ ...requestData });
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
