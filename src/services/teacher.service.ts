import { FindOptionsOrder, FindOptionsWhere } from "typeorm";
import AppDataSource from "../data-source";
import { ResponseData } from "../schemas/common.schema";
import { Teacher } from "../entities/teacher";
const repository = AppDataSource.getRepository(Teacher);

export const findTeacherAll = async (
	_filter: Partial<Teacher>,
	order: FindOptionsOrder<Teacher> = { Id: "ASC" }
): Promise<ResponseData<Teacher[]>> => {
	var response: ResponseData<Teacher[]> = { status: false };
	try {
		var where: FindOptionsWhere<Teacher> = {};

		var data = await repository.find({
			where,
			order,
		});

		return {
			...response,
			status: true,
			data,
		};
	} catch (error) {
		var message = "";
		if (typeof error === "string") message = error;
		else if (error instanceof Error) message = error.message;
		return {
			...response,
			message,
		};
	}
};

export const findTeacherOne = async (
	_filter: Partial<Teacher>,
	order: FindOptionsOrder<Teacher> = { Id: "ASC" }
): Promise<ResponseData<Teacher | null>> => {
	var response: ResponseData<Teacher | null> = { status: false };
	try {
		var where: FindOptionsWhere<Teacher> = {};

		var data = await repository.findOne({
			where,
			order,
		});

		return {
			...response,
			status: true,
			data,
		};
	} catch (error) {
		var message = "";
		if (typeof error === "string") message = error;
		else if (error instanceof Error) message = error.message;
		return {
			...response,
			message,
		};
	}
};

export const createTeacher = async (
	input: Partial<Teacher>
): Promise<ResponseData> => {
	var response: ResponseData = { status: false };
	try {
		var data = repository.create({
			...input,
		});
		data = await repository.save(data);

		return {
			...response,
			status: true,
			data,
		};
	} catch (e) {
		var message = "";
		if (typeof e === "string") message = e;
		else if (e instanceof Error) {
			message = e.message;
			if (message.includes("duplicate key value violates unique constraint"))
				return {
					...response,
					status: true,
				};
		}
		return {
			...response,
			message,
		};
	}
};

export const updateTeacher = async (
	input: Partial<Teacher>
): Promise<ResponseData> => {
	var response: ResponseData = { status: false };
	try {
		const data = await repository.update(input.Id!, input);

		return {
			...response,
			status: true,
			data,
		};
	} catch (e) {
		var message = "";
		if (typeof e === "string") message = e;
		else if (e instanceof Error) message = e.message;
		return {
			...response,
			message,
		};
	}
};

export const deleteTeacher = async (
	input: Partial<Teacher>
): Promise<ResponseData> => {
	var response: ResponseData = { status: false };
	try {
		const data = await repository.delete(input.Id!);
		return {
			...response,
			status: true,
			data,
		};
	} catch (e) {
		var message = "";
		if (typeof e === "string") message = e;
		else if (e instanceof Error) message = e.message;
		return {
			...response,
			message,
		};
	}
};
