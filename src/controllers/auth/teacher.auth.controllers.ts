import { Request, Response } from "express";
import teacherModel from "../../models/auth/teacher.auth.models";
import { apiError, apiOtherError, apiSuccess } from "../../utils/apiResponse";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { createToken } from "../../utils/token";

export const createTeacherController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(403)
        .json(apiError("unauthorized_error", "Only super admins can create"));
    }

    const resp = new teacherModel({
      ...req.body,
      password: await hashPassword(req.body.password),
    });
    await resp.save();

    resp.password = "";

    res
      .status(200)
      .json(apiSuccess({ teacher: resp }, "Teacher created successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const getAllTeachersController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const teachers = await teacherModel.find();
    res.status(200).json(apiSuccess({ teachers }));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const getOneTeacherController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const teacher = await teacherModel
      .findById(req.params.teacherId)
      .select("-password -createdAt -updatedAt -__v")
      .populate({
        path: "school",
        select: "-classes -admins -createdAt -updatedAt -__v",
        populate: {
          path: "createdBy",
          select: "-password -createdAt -updatedAt -__v",
        },
      });

    if (!teacher) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Teacher not found"));
    }

    res.status(200).json(apiSuccess({ teacher }, "Teacher data found"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const loginTeacherController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { username, password } = req.body;
    const teacher: any = await teacherModel.findOne({ username });
    if (!teacher) {
      return res
        .status(401)
        .json(apiError("unauthorized_error", "Invalid username or password"));
    }

    if (!teacher.isAccountActive) {
      return res
        .status(401)
        .json(apiError("unauthorized_error", "Account is not active"));
    }

    const passwordMatched = await comparePassword(password, teacher.password);
    if (!passwordMatched) {
      return res
        .status(401)
        .json(apiError("unauthorized_error", "Invalid password"));
    }

    const token = await createToken({
      id: teacher._id,
      username: teacher.username,
      isAccountActive: teacher.isAccountActive,
      isTeacher: teacher.isTeacher,
    });

    res.status(200).json(apiSuccess({ token }, "Logged in successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const getTeacherInfoController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const teacherInfo = await teacherModel.findById(req.user.id);
    if (!teacherInfo?.isAccountActive) {
      return res
        .status(401)
        .json(apiError("unauthorized_error", "Account is not active"));
    }
    const teacher: any = await teacherModel
      .findById(req.user.id)
      .select("-password -createdAt -updatedAt -__v")
      .populate({
        path: "school",
        select: "-classes -admins -createdAt -updatedAt -__v",
        populate: {
          path: "createdBy",
          select: "-password -createdAt -updatedAt -__v",
        },
      });

    if (!teacher) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Teacher not found"));
    }

    res.status(200).json(apiSuccess(teacher, "Teacher info"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const updateTeacherInfoController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const teacherInfo = await teacherModel.findById(req.user.id);
    if (!teacherInfo?.isAccountActive) {
      return res
        .status(401)
        .json(apiError("unauthorized_error", "Account is not active"));
    }

    const updatedTeacher = await teacherModel
      .findByIdAndUpdate(req.user.id, req.body, { new: true })
      .select("-password -createdAt -updatedAt -__v");

    if (!updatedTeacher) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Teacher not found"));
    }

    res.status(200).json(apiSuccess(updatedTeacher, "Teacher info updated"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const deleteTeacherInfoController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user?.isSuperAdmin) {
      return res
        .status(403)
        .json(apiError("unauthorized_error", "Only super admins can delete"));
    }

    const deletedTeacher = await teacherModel
      .findByIdAndUpdate(
        req.params.teacherId,
        { isAccountActive: false },
        { new: true }
      )
      .select("-password -createdAt -updatedAt -__v");

    if (!deletedTeacher) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Teacher not found"));
    }

    res.status(200).json(apiSuccess(deletedTeacher, "Teacher deleted"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const activateTeacherInfoController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user?.isSuperAdmin) {
      return res
        .status(403)
        .json(apiError("unauthorized_error", "Only super admins can activate"));
    }

    const deletedTeacher = await teacherModel
      .findByIdAndUpdate(
        req.params.teacherId,
        { isAccountActive: true },
        { new: true }
      )
      .select("-password -createdAt -updatedAt -__v");

    if (!deletedTeacher) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Teacher not found"));
    }

    res.status(200).json(apiSuccess(deletedTeacher, "Teacher Activated"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};
