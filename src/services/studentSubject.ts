// import { FindOptionsOrder, FindOptionsWhere } from "typeorm";
// import AppDataSource from "../data-source";
// import { Student } from "../entities/student";
// import { StudentSubject } from "../entities/student-subject";
// import { ResponseData } from "../schemas/common.schema";
// import { Subject } from "typeorm/persistence/Subject";

// const repository = AppDataSource.getRepository(Student);
// // export const findStudentAll = async (
// // 	_filter: Subject,
// // 	order: FindOptionsOrder<StudentSubject> = { Subject: "ASC" }
// // ): Promise<ResponseData<Student[] | null>> => {
// // 	var response: ResponseData<Student[]> = { status: false };
// // 	try {
// // 		var where: FindOptionsWhere<Student> = {};
// // 		if (_filter) where.Subjects = [_filter];

// // 		const students = await repository.find({
// // 			join: {
// // 				alias: "student",
// // 				innerJoinAndSelect: {
// // 					Subjects: "student.Subjects",
// // 				},
// // 			},
// //             where:{
// //                 Subjects:
// //             }
// // 		});
// // 		return {
// // 			...response,
// // 			status: true,
// // 			data: students,
// // 			total: students.length,
// // 		};
// // 	} catch (error) {
// // 		var message = "";
// // 		if (typeof error === "string") message = error;
// // 		else if (error instanceof Error) message = error.message;
// // 		return {
// // 			...response,
// // 			message,
// // 		};
// // 	}
// // };

// export const findStudentAll = async (
// 	_filter: Partial<Subject>,
// 	order: FindOptionsOrder<StudentSubject> = { Subject: "ASC" }
// ): Promise<ResponseData<Student[] | null>> => {
// 	var response: ResponseData<Student[]> = { status: false };
// 	try {
// 		var where: FindOptionsWhere<Student> = {};
// 		if (_filter) where. = _filter.Id;

// 		const students = await repository.find({
// 			// relations: {
// 			// 	Subjects: true,
// 			// },
// 			// join: {
// 			// 	alias: "student",
// 			// 	innerJoinAndSelect: {
// 			// 		Subjects: "student.Subjects",
// 			// 	},
// 			// },
// 			where: {
//                 Subjects:{
//                     Code
//                 }
//             },
// 			// order: order,
// 		});

// 		return {
// 			...response,
// 			status: true,
// 			data: students,
// 			total: students.length,
// 		};
// 	} catch (error) {
// 		var message = "";
// 		if (typeof error === "string") message = error;
// 		else if (error instanceof Error) message = error.message;
// 		return {
// 			...response,
// 			message,
// 		};
// 	}
// };
