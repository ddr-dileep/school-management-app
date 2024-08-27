import { Request, Response } from "express";
import { apiError, apiOtherError, apiSuccess } from "../../utils/apiResponse";
import feesModel from "../../models/school/school.class.fees.model";
import classModel from "../../models/school/schools.class.school.models";

export const createFeesController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(404)
        .json(apiError("authentication_error", "Only admin can create fees."));
    }

    const schoolData: any = await classModel.findById(req.params.classId);

    if (!schoolData) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Class not found."));
    }

    const exitingFeesOfClass = await feesModel.find({
      class: req.params.classId,
    });

    if (exitingFeesOfClass.length > 0) {
      return res
        .status(404)
        .json(
          apiError("not_found_error", "Fees for this class already exists.")
        );
    }

    const reqBody = {
      ...req.body,
      class: req.params.classId,
      school: schoolData?.school,
      createdBy: req.user.id,
    };

    const fees = await feesModel.create(reqBody);
    res.json(apiSuccess({ fees }, "Fees created successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const getFeesByClassIdController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const fees = await feesModel
      .find({ class: req.params.classId })
      .populate("class")
      .populate("school");

    res.json(apiSuccess({ fees }, "fees fetched successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const getAllFeesController = async (req: Request, res: Response) => {
  try {
    const fees = await feesModel.find().populate("class").populate("school");

    res.json(apiSuccess({ fees }, "All fees fetched successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const deleteFeesController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(404)
        .json(apiError("authentication_error", "Only admin can delete fees."));
    }

    const fees = await feesModel.findByIdAndUpdate(req.params.feesId, {
      isDeleted: true,
    });

    if (!fees) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Fees not found."));
    }

    res.json(apiSuccess({}, "Fees deleted successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};

export const updateFeesController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(404)
        .json(apiError("authentication_error", "Only super admin can update."));
    }

    const fees = await feesModel.findByIdAndUpdate(
      req.params.feesId,
      req.body,
      {
        new: true,
      }
    );

    if (!fees) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Fees not found."));
    }

    res.json(apiSuccess({ fees }, "Fees updated successfully"));
  } catch (error) {
    res.status(404).json(apiOtherError(error));
  }
};
