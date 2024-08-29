import { Request, Response } from "express";
import { apiOtherError, apiSuccess } from "../../utils/apiResponse";
import studentModel from "../../models/auth/student.auth.models";
import { hashPassword } from "../../utils/bcrypt";
import classModel from "../../models/school/schools.class.school.models";

export const getAllStudentControllers = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(403)
        .json(apiOtherError("You are not authorized to perform this action"));
    }
    const allStudent = await studentModel.find();

    res.json(
      apiSuccess(
        { count: allStudent.length, students: allStudent },
        "Get all students"
      )
    );
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const getStudentsOfOneSchool = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!(req.user.isSuperAdmin || req.user.isAdmin)) {
      return res
        .status(403)
        .json(apiOtherError("You are not authorized to perform this action"));
    }
    const students = await studentModel.find({ school: req.params.schoolId });
    res.json(apiSuccess({ students }));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const createStudentController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!(req.user.isSuperAdmin || req.user.isAdmin)) {
      return res
        .status(403)
        .json(apiOtherError("You are not authorized to perform this action"));
    }

    const classDetails: any = await classModel.findById(req.body.cls);

    if (!classDetails) {
      return res.status(404).json(apiOtherError("Class not found"));
    }

    const reqBody = {
      ...req.body,
      password: await hashPassword(req.body.password),
      createdBy: req.user.id,
      class: classDetails._id,
      school: classDetails?.school,
    };

    const student = new studentModel(reqBody);
    await student.save();

    res.json(apiSuccess({ student }, "Student created successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};
