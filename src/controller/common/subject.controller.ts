import { Request, Response } from "express";
import {
	addSubject,
	deleteSubject,
	findOneSubject,
	findSubjectAll,
	updateSubject,
} from "../../services/subject.service";
import { validate } from "../../../validate";
import { ResMessageCommon } from "../../../constants";
import { ResponseData } from "../../schemas/common.schema";
// import { findStudentAll } from "../../services/studentSubject";
export const getAllSubjectHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var result = await findSubjectAll();

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
export const getOneSubjectHandler = async (req: Request, res: Response) => {
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
		var result = await findOneSubject({ Code: requestData.Code });
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
export const addSubjectHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var requestData = req.body;
		const valid = validate(requestData, {
			Name: { type: "string", required: true, max: 255 },
			Description: { type: "string", max: 255 },
			Code: { type: "string", required: true, max: 255 },
		});

		if (!valid.status) {
			return res.json({
				...response,
				message: valid.errors[0],
			});
		}

		var subject = await findOneSubject({ Code: valid.data.Code });
		if (subject.data) {
			return res.json({
				...response,
				message: ResMessageCommon.duplicate,
			});
		}

		requestData = valid.data;
		var result = await addSubject({ ...requestData });
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
export const updateSubjectHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var requestData = req.body;
		const valid = validate(requestData, {
			Name: { type: "string", required: true, max: 255 },
			Description: { type: "string", max: 255 },
			Code: { type: "string", required: true, max: 255 },
			NewCode: { type: "string", required: true, max: 255 },
		});

		if (!valid.status) {
			return res.json({
				...response,
				message: valid.errors[0],
			});
		}

		var subject = await findOneSubject({ Code: valid.data.Code });
		if (!subject.data) {
			return res.json({
				...response,
				message: ResMessageCommon.noneExist,
			});
		}

		requestData = {
			Id: subject.data.Id,
			Code: valid.data.NewCode,
			Description: valid.data.Description,
			Name: valid.data.Name,
		};
		valid.data;
		var result = await updateSubject({ ...requestData });
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
export const deleteSubjectHandler = async (req: Request, res: Response) => {
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

		var subject = await findOneSubject({ Code: valid.data.Code });
		if (!subject.data) {
			return res.json({
				...response,
				message: ResMessageCommon.noneExist,
			});
		}

		requestData = {
			Id: subject.data.Id,
		};
		valid.data;
		var result = await deleteSubject({ ...requestData });
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

export const getStudentHandler = async (req: Request, res: Response) => {
	var response: ResponseData = { status: false };
	try {
		var requestData = req.body;
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
		var subject = await findOneSubject({ Code: requestData.Code });
		if (!subject.data) {
			return res.json({
				...response,
				message: ResMessageCommon.noneExist,
			});
		}
		// const students = await findStudentAll({});
		// return res.json({
		// 	...response,
		// 	...students,
		// });
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
			Description: { type: "string", max: 255 },
			Code: { type: "string", required: true, max: 255 },
		});

		if (!valid.status) {
			return res.json({
				...response,
				message: valid.errors[0],
			});
		}

		var subject = await findOneSubject({ Code: valid.data.Code });
		if (subject.data) {
			return res.json({
				...response,
				message: ResMessageCommon.duplicate,
			});
		}

		requestData = valid.data;
		var result = await addSubject({ ...requestData });
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

		var subject = await findOneSubject({ Code: valid.data.Code });
		if (!subject.data) {
			return res.json({
				...response,
				message: ResMessageCommon.noneExist,
			});
		}

		requestData = {
			Id: subject.data.Id,
		};
		valid.data;
		var result = await deleteSubject({ ...requestData });
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
