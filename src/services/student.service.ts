import AppDataSource from "../data-source";
import { Student } from "../entities/student";
import { ResponseData } from "../schemas/common.schema";
const repository = AppDataSource.getRepository(Student);

export const findAllStudent = async () => {
  var response: ResponseData = { status: false };

  try {
    const student: Student[] = await repository.find({
      select: {
        Code: true,
        Name: true,
        Dob: true,
      },
    });
    return student;
  } catch (error) {
    return false;
  }
};

export const findOneStudent = async (code: string) => {
  const student: Student[] = await repository.find({
    where: {
      Code: code,
    },
  });
  return student;
};

export const addStudent = async (code: string, name: string, dob: Date) => {
  var response: ResponseData = { status: false };

  try {
    const student: Student[] = await findOneStudent(code);
    if (student.length != 0) {
      return false;
    }
    const newStudent = new Student();
    newStudent.Code = code;
    newStudent.Name = name;
    newStudent.Dob = dob;

    const result: Student[] = await repository.save(student);
    if (!result) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
