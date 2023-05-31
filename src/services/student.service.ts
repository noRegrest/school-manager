import { FindOptionsOrder, FindOptionsWhere } from "typeorm";
import AppDataSource from "../data-source";
import { Student } from "../entities/student";
import { ResponseData } from "../schemas/common.schema";
const repository = AppDataSource.getRepository(Student);

export const findStudentAll = async (
	_filter: Partial<Student> = {},
	order: FindOptionsOrder<Student> = { Id: "ASC" }
): Promise<ResponseData<Student[]>> => {
	var response: ResponseData<Student[]> = { status: false };
	try {
		var where: FindOptionsWhere<Student>[] = [];

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

export const findOneStudent = async (
	_filter: Partial<Student>,
	order: FindOptionsOrder<Student> = { Id: "ASC" }
): Promise<ResponseData<Student | null>> => {
	var response: ResponseData<Student | null> = { status: false };

	try {
		var where: FindOptionsWhere<Student>[] = [];
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

export const addStudent = async (
	input: Partial<Student>
): Promise<ResponseData> => {
	var response: ResponseData = { status: false };
	try {
		var data = repository.create({ ...input });
		data = await await repository.save(data);
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

export const updateStudent = async (
	input: Partial<Student>
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

export const deleteStudent = async (
	input: Partial<Student>
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
