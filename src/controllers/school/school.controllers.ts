import { Request, Response } from "express";
import { apiError, apiOtherError, apiSuccess } from "../../utils/apiResponse";
import schoolModel from "../../models/school/school.models";

export const createSchoolController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(403)
        .json(
          apiError("unauthorized_error", "Only super admins can create schools")
        );
    }

    const requestBody = {
      ...req.body,
      createdBy: req.user.id,
    };

    const school = new schoolModel(requestBody);

    await school.save();

    res.status(200).json(apiSuccess({ school }, "School created successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const getAllSchoolController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const schools = await schoolModel
      .find()
      .populate({
        path: "createdBy",
        select: "-password -isAccountActive -schools -updatedAt -__v",
      })
      .select("-__v");

    const resp = {
      count: schools.length,
      schools,
    };

    res.status(200).json(apiSuccess(resp, "School created successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const getSchoolByIdController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const school = await schoolModel
      .findById(req.params.schoolId)
      .populate({
        path: "createdBy",
        select: "-password -isAccountActive -schools -updatedAt -__v",
      })
      .select("-__v");

    if (!school) {
      return res
        .status(404)
        .json(apiError("not_found_error", "School not found"));
    }

    res.status(200).json(apiSuccess({ school }, "School found successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const updateSchoolByIdController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(403)
        .json(
          apiError("unauthorized_error", "Only super admins can create schools")
        );
    }

    const schoolId = req.params.schoolId;
    const updatedSchool = await schoolModel.findByIdAndUpdate(
      schoolId,
      req.body,
      { new: true }
    );

    if (!updatedSchool) {
      return res
        .status(404)
        .json(apiError("not_found_error", "School not found"));
    }

    res
      .status(200)
      .json(
        apiSuccess({ school: updatedSchool }, "School updated successfully")
      );
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const deleteSchoolByIdController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(403)
        .json(
          apiError("unauthorized_error", "Only super admins can create schools")
        );
    }

    const schoolId = req.params.schoolId;
    const deletedSchool = await schoolModel.findByIdAndUpdate(
      schoolId,
      {
        isActive: false,
      },
      { news: true }
    );

    if (!deletedSchool) {
      return res
        .status(404)
        .json(apiError("not_found_error", "School not found"));
    }

    res
      .status(200)
      .json(
        apiSuccess({ school: deletedSchool }, "School deleted successfully")
      );
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const activateSchoolController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(403)
        .json(
          apiError("unauthorized_error", "Only super admins can create schools")
        );
    }
    const schoolId = req.params.schoolId;
    const activatedSchool = await schoolModel.findByIdAndUpdate(
      schoolId,
      {
        isActive: true,
      },
      { new: true }
    );

    if (!activatedSchool) {
      return res
        .status(404)
        .json(apiError("not_found_error", "School not found"));
    }

    res
      .status(200)
      .json(
        apiSuccess({ school: activatedSchool }, "School activated successfully")
      );
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};
