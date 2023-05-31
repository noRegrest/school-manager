import { FindOptionsOrder, FindOptionsWhere } from "typeorm";
import AppDataSource from "../data-source";
import { ResponseData } from "../schemas/common.schema";
import { Subject } from "../entities/subject";
const repository = AppDataSource.getRepository(Subject);

export const findSubjectAll = async (
	_filter: Partial<Subject> = {},
	order: FindOptionsOrder<Subject> = { Id: "ASC" }
): Promise<ResponseData<Subject[]>> => {
	var response: ResponseData<Subject[]> = { status: false };
	try {
		var where: FindOptionsWhere<Subject>[] = [];

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

export const findOneSubject = async (
	_filter: Partial<Subject>,
	order: FindOptionsOrder<Subject> = { Id: "ASC" }
): Promise<ResponseData<Subject | null>> => {
	var response: ResponseData<Subject | null> = { status: false };

	try {
		var where: FindOptionsWhere<Subject>[] = [];
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

export const addSubject = async (
	input: Partial<Subject>
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

export const updateSubject = async (
	input: Partial<Subject>
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

export const deleteSubject = async (
	input: Partial<Subject>
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
