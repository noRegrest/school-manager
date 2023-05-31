import { Request, Response } from "express";
import {
	addStudent,
	findOneStudent,
	findStudentAll,
} from "../../services/student.service";
import { validate } from "../../../validate";
import { Student } from "../../entities/student";
import { ResMessageCommon } from "../../../constants";
export const getAllStudentHandler = async (req: Request, res: Response) => {
	try {
		var result = await findStudentAll();
		// if (!result) {
		// 	throw "Cannot query.";
		// }
		return res.json({
			status: true,
			data: result,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: false,
			message: ResMessageCommon.somethingWentWrong,
		});
	}
};
export const getOneStudentHandler = async (req: Request, res: Response) => {
	try {
		var requestData = req.params;
		var valid = validate(requestData, {
			code: { type: "string", required: true },
		});
		if (valid.status == false) {
			return res.json({
				status: false,
				message: valid.errors[0],
			});
		}
		requestData = valid.data;
		var result = await findOneStudent({});
		return res.json({
			status: true,
			data: result,
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
	try {
		var requestData = req.body;
		const valid = validate(requestData, {
			name: { type: "string", required: true },
			dob: { type: "date", required: true },
			code: { type: "string", required: true },
		});

		if (!valid.status) {
			return res.json({
				status: false,
				message: valid.errors[0],
			});
		}

		requestData = valid.data;
		// var temp = await addStudent(
		// 	{code: requestData.code,
		// 	requestData.name,
		// 	requestData.dob}
		// );
		// if (temp) {
		// 	return res.json({
		// 		status: true,
		// 	});
		// } else throw "_";
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: false,
			message: ResMessageCommon.somethingWentWrong,
		});
	}
};
export const updateStudentHandler = async (req: Request, res: Response) => {
	res.json({
		status: true,
	});
};
export const deleteStudentHandler = async (req: Request, res: Response) => {
	res.json({
		status: true,
	});
};
function findAllStudent() {
	throw new Error("Function not implemented.");
}
