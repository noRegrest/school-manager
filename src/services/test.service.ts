import { FindOptionsOrder, FindOptionsWhere } from "typeorm";
import AppDataSource from "../data-source";
import { Test } from "../entities/test";
import { ResponseData } from "../schemas/common.schema";
const repository = AppDataSource.getRepository(Test);

export const findTestAll = async (
	_filter: Partial<Test> = {},
	order: FindOptionsOrder<Test> = { Id: "ASC" }
): Promise<ResponseData<Test[] | null>> => {
	var response: ResponseData<Test[]> = { status: false };
	try {
		var where: FindOptionsWhere<Test> = {};

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

export const findOneTest = async (
	_filter: Partial<Test>,
	order: FindOptionsOrder<Test> = { Id: "ASC" }
): Promise<ResponseData<Test | null>> => {
	var response: ResponseData<Test | null> = { status: false };

	try {
		var where: FindOptionsWhere<Test> = {};
		if (_filter.Code) where.Code = _filter.Code;
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

export const addTest = async (input: Partial<Test>): Promise<ResponseData> => {
	var response: ResponseData = { status: false };
	try {
		var data = repository.create({ ...input });
		data = await repository.save(data);
		return {
			...response,
			status: true,
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

export const updateTest = async (
	input: Partial<Test>
): Promise<ResponseData> => {
	var response: ResponseData = { status: false };
	try {
		const data = await repository.update(input.Id!, input);

		return {
			...response,
			status: true,
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

export const deleteTest = async (
	input: Partial<Test>
): Promise<ResponseData> => {
	var response: ResponseData = { status: false };
	try {
		const data = await repository.delete(input.Id!);
		return {
			...response,
			status: true,
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
