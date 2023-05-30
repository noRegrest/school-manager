import { Request, Response } from "express";
import { findOneStudent } from "../../services/student.service";
import { validate } from "../../../validate";
export const getAllStudentHandler = async (req: Request, res: Response) => {
  console.log(req.params.id);

  // var valid = validate(req.params, {
  //   id: { type: "number", required: true },
  // });

  // if (valid.status == false) {
  //   return res.json({
  //     status: false,
  //   });
  // }

  // var temp = findOneStudent(valid.data.id);
  // return res.json({
  //   status: true,
  // });
};
export const getOneStudentHandler = async (req: Request, res: Response) => {
  console.log(req.params.id);
  res.json({
    status: true,
  });
};
export const addStudentHandler = async (req: Request, res: Response) => {
  res.json({
    status: true,
  });
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
