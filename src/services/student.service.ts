import AppDataSource from "../data-source";
import { Student } from "../entities/student";

export const findAllStudent = async (id: Number) => {
  const studentRepository = AppDataSource.getRepository(Student);

  //   await studentRepository.save(student);
  return await studentRepository.find();
};
export const findOneStudent = async (id: Number) => {
  const studentRepository = AppDataSource.getRepository(Student);

  const student = new Student();
  student.code = "2";
  student.dob = "2000-05-08";
  student.name = "test";
  await studentRepository.save(student);
  // await studentRepository.find();
};
