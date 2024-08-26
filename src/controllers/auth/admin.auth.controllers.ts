import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { apiError, apiOtherError, apiSuccess } from "../../utils/apiResponse";
import AdminModel from "../../models/auth/admin.auth.models";
import SuperAdminModel from "../../models/auth/super-admin.auth.models";
import { createToken } from "../../utils/token";

export const registerAdminController = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    if (!req.user.isSuperAdmin) {
      return res
        .status(401)
        .json(apiError("unauthorized_error", "You can not create a admin"));
    }

    const hashedPassword = await hashPassword(req.body.password);

    const user = new AdminModel({
      ...req.body,
      password: hashedPassword,
      createdBy: req.user.id,
    });
    await user.save();

    res.status(201).json(apiSuccess(user, "admin registered successfully"));
  } catch (error: any) {
    res.status(400).json(apiOtherError(error));
  }
};

export const loginAdminController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const admin = await AdminModel.findOne({
      username: req.body.username,
    });

    if (!admin) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Admin not found"));
    }

    const isMatch = await comparePassword(req.body.password, admin.password);

    if (!isMatch) {
      return res
        .status(401)
        .json(apiError("invalid_credentials", "Invalid credentials"));
    }

    // generating  token
    const token = await createToken({
      id: admin._id,
      isAdmin: admin.isAdmin,
      isAccountActive: admin.isAccountActive,
    });

    res.json(apiSuccess({ token }, "Logged in successfully"));
  } catch (error) {
    const resp = apiError(error, "Error registering admin");
    res.status(400).json(resp);
  }
};

export const getAdminInfoController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const admin = await AdminModel.findById(req.user.id).select("-password");
    if (!admin) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Admin not found"));
    }

    res.json(apiSuccess({ user: admin }));
  } catch (error) {
    const resp = apiError(error, "Error getting admin");
    res.status(400).json(resp);
  }
};

export const deleteAdminController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const superAdmin = await SuperAdminModel.find({ id: req.user.id });

    if (!superAdmin) {
      return res
        .status(401)
        .json(apiError("unauthorized_error", "You can not delete an admin"));
    }

    const admin = await AdminModel.findByIdAndUpdate(
      req.user.id,
      { isAccountActive: false },
      { new: true }
    );

    if (!admin) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Admin not found"));
    }

    res.json(apiSuccess({ user: admin }, "Admin deleted successfully"));
  } catch (error) {
    const resp = apiError(error, "Error deleting admin");
    res.status(400).json(resp);
  }
};

export const activateAdminController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const superAdmin = await SuperAdminModel.find({ id: req.user.id });

    if (!superAdmin) {
      return res
        .status(401)
        .json(apiError("unauthorized_error", "You can not activate an admin"));
    }

    const admin = await AdminModel.findByIdAndUpdate(
      req.params.adminId,
      { isAccountActive: true },
      { new: true }
    );

    if (!admin) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Admin not found"));
    }

    res.json(apiSuccess({ user: admin }, "Admin activated successfully"));
  } catch (error) {
    const resp = apiError(error, "Error activating admin");
    res.status(400).json(resp);
  }
};

export const updateAdminController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const user = await AdminModel.findById(req.user.id);
    if (!user?.isAccountActive) {
      return res
        .status(403)
        .json(
          apiError(
            "unauthorized_error",
            "You cannot update the admin of an inactive user."
          )
        );
    }

    const { password, ...updateData } = req.body;

    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(apiSuccess({ user: updatedAdmin }, "Admin updated successfully"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};
