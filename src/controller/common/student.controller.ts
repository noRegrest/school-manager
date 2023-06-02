import { Request, Response } from "express";
import {
	addStudent,
	deleteStudent,
	findOneStudent,
	findStudentAll,
	updateStudent,
} from "../../services/student.service";
import { validate } from "../../../validate";
import { Student } from "../../entities/student";
import { ResMessageCommon } from "../../../constants";
import { ResponseData } from "../../schemas/common.schema";
export const getAllStudentHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var result = await findStudentAll();

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
export const getOneStudentHandler = async (req: Request, res: Response) => {
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
		var result = await findOneStudent({ Code: requestData.Code });
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
export const addStudentHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var requestData = req.body;
		const valid = validate(requestData, {
			Name: { type: "string", required: true, max: 255 },
			Dob: { type: "date", required: true },
			Code: { type: "string", required: true, max: 255 },
		});

		if (!valid.status) {
			return res.json({
				...response,
				message: valid.errors[0],
			});
		}

		var student = await findOneStudent({ Code: valid.data.Code });
		if (student.data) {
			return res.json({
				...response,
				message: ResMessageCommon.duplicate,
			});
		}

		requestData = valid.data;
		var result = await addStudent({ ...requestData });
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
export const updateStudentHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var requestData = req.body;
		const valid = validate(requestData, {
			Name: { type: "string", required: true, max: 255 },
			Dob: { type: "date", required: true },
			Code: { type: "string", required: true, max: 255 },
			NewCode: { type: "string", required: true, max: 255 },
		});

		if (!valid.status) {
			return res.json({
				...response,
				message: valid.errors[0],
			});
		}

		var student = await findOneStudent({ Code: valid.data.Code });
		if (!student.data) {
			return res.json({
				...response,
				message: ResMessageCommon.noneExist,
			});
		}

		requestData = {
			Id: student.data.Id,
			Code: valid.data.NewCode,
			Dob: valid.data.Dob,
			Name: valid.data.Name,
		};
		valid.data;
		var result = await updateStudent({ ...requestData });
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
export const deleteStudentHandler = async (req: Request, res: Response) => {
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

		var student = await findOneStudent({ Code: valid.data.Code });
		if (!student.data) {
			return res.json({
				...response,
				message: ResMessageCommon.noneExist,
			});
		}

		requestData = {
			Id: student.data.Id,
		};
		valid.data;
		var result = await deleteStudent({ ...requestData });
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
