import { FindOptionsOrder, FindOptionsWhere, ILike } from "typeorm";
import AppDataSource from "../data-source";
import User from "../entities/user";
import { ResponseData } from "../schemas/common.schema";
import { ResMessageCommon } from "../../constants";
const repository = AppDataSource.getRepository(User);

export const findUserAll = async (
	_filter: Partial<User> = {},
	order: FindOptionsOrder<User> = { Id: "ASC" }
): Promise<ResponseData<User[]>> => {
	var response: ResponseData<User[]> = { status: false };
	try {
		var where: FindOptionsWhere<User> = {};

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

export const findOneUser = async (
	_filter: Partial<User>,
	order: FindOptionsOrder<User> = { Id: "ASC" }
): Promise<ResponseData<User | null>> => {
	var response: ResponseData<User | null> = { status: false };

	try {
		var where: FindOptionsWhere<User> = {};
		// if (_filter.Code) where.Code = _filter.Code;
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

export const addUser = async (input: Partial<User>): Promise<ResponseData> => {
	var response: ResponseData = { status: false };
	try {
		await repository.save({ ...input });
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

export const updateUser = async (
	input: Partial<User>
): Promise<ResponseData> => {
	var response: ResponseData = { status: false };
	try {
		await repository.update(input.Id!, input);

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
					message: ResMessageCommon.duplicate,
				};
		}
		return {
			...response,
			message,
		};
	}
};

export const deleteUser = async (
	input: Partial<User>
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
