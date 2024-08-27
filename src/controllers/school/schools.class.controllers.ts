import { Request, Response } from "express";
import { apiError, apiOtherError, apiSuccess } from "../../utils/apiResponse";
import classModel from "../../models/school/schools.class.school.models";

export const createClassController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(403)
        .json(
          apiError(
            "unauthorized_error",
            "Only admins and super admins can create classes"
          )
        );
    }

    const cls = new classModel({
      ...req.body,
      school: req.params.schoolId,
      createdBy: req.user.id,
    });

    await cls.save();

    res.status(200).json(apiSuccess({ cls }, "Claas create successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const getAllClassesBySchoolIdController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const classes = await classModel.find({ school: req.params.schoolId });
    if (!classes) {
      return res
        .status(404)
        .json(apiError("not_found_error", "No classes found for this school"));
    }

    res.status(200).json(apiSuccess({ classes }, "Classes found successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const getOneClassByClassId = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { classId, schoolId } = req.params;
    const cls = await classModel.findById(classId);
    if (!cls) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Class not found"));
    }

    res.status(200).json(apiSuccess({ cls }, "Class found successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const updateClassByIdController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(403)
        .json(
          apiError("unauthorized_error", "Only super admins can update classes")
        );
    }

    const cls = await classModel.findByIdAndUpdate(
      req.params.classId,
      req.body,
      { new: true }
    );

    if (!cls) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Class not found"));
    }

    res.status(200).json(apiSuccess({ cls }, "Class updated successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const deleteClassByIdController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(403)
        .json(
          apiError("unauthorized_error", "Only super admins can delete classes")
        );
    }

    const cls = await classModel.findByIdAndDelete(req.params.classId);

    if (!cls) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Class not found"));
    }

    res.status(200).json(apiSuccess({}, "Class deleted successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};
