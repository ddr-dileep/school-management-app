import { Request, Response } from "express";
import SuperAdminModel from "../../models/auth/super-admin.auth.models";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { apiError, apiSuccess } from "../../utils/apiResponse";
import { createToken } from "../../utils/token";

export const registerSuperAdminController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // if admin is already registered
    const existingUser = await SuperAdminModel.findOne({
      username: req.body.username,
    });
    if (existingUser) {
      return res
        .status(400)
        .json(apiError("duplicate_error", "Super admin already exists"));
    }

    const hashedPassword = await hashPassword(req.body.password);

    const user = new SuperAdminModel({ ...req.body, password: hashedPassword });
    await user.save();

    res
      .status(201)
      .json(apiSuccess(user, "Super admin registered successfully"));
  } catch (error) {
    const resp = apiError(error, "Error registering super admin");
    res.status(400).json(resp);
  }
};

export const loginSuperAdmin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const superAdmin = await SuperAdminModel.findOne({
      username: req.body.username,
    });

    if (!superAdmin) {
      return res
        .status(401)
        .json(
          apiError("unauthorized_error", "Invalid username or user not exist")
        );
    }

    const isMatch = await comparePassword(
      req.body.password,
      superAdmin.password
    );

    if (!isMatch) {
      return res
        .status(401)
        .json(apiError("unauthorized_error", "Invalid username or password"));
    }

    const token = await createToken({
      id: superAdmin._id,
      username: superAdmin.username,
      isSuperAdmin: superAdmin.isSuperAdmin,
    });

    res.json(apiSuccess({ token }, "Logged in successfully"));
  } catch (error) {
    const resp = apiError(error, "Error logging in super admin");
    res.status(400).json(resp);
  }
};

export const getSuperAdmin = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const admin: any = await SuperAdminModel.findById(req.user.id).select(
      "-password"
    );
    if (!admin) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Super admin not found"));
    }
    if (!admin.isSuperAdmin) {
      return res
        .status(403)
        .json(
          apiError("authorised_error", "Unauthorized to access super admin")
        );
    }
    res.json(apiSuccess({ user: admin }));
  } catch (error) {
    const resp = apiError(error, "Error getting super admin");
    res.status(400).json(resp);
  }
};

export const updateSuperAdmin = async (req: Request | any, res: Response) => {
  try {
    // update the super admin
    const superAdmin = await SuperAdminModel.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );

    if (!superAdmin) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Super admin not found"));
    }

    res.json(apiSuccess({ user: superAdmin }));
  } catch (error) {
    const resp = apiError(error, "Error getting super admin");
    res.status(400).json(resp);
  }
};

export const deleteSuperAdmin = async (req: Request | any, res: Response) => {
  try {
    // delete the super admin || suspend the account
    const superAdmin = await SuperAdminModel.findByIdAndUpdate(
      req.user.id,
      { isAccountActive: false },
      { new: true }
    );

    if (!superAdmin) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Super admin not found"));
    }

    res.json(apiSuccess({ message: "Super admin deleted successfully" }));
  } catch (error) {
    const resp = apiError(error, "Error getting super admin");
    res.status(400).json(resp);
  }
};

export const activateSuperAdmin = async (req: Request | any, res: Response) => {
  try {
    const superAdmin = await SuperAdminModel.findByIdAndUpdate(
      req.user.id,
      { isAccountActive: true },
      { new: true }
    );

    if (!superAdmin) {
      return res
        .status(404)
        .json(apiError("not_found_error", "Super admin not found"));
    }

    res.json(apiSuccess({ message: "Super admin activated successfully" }));
  } catch (error) {
    const resp = apiError(error, "Error getting super admin");
    res.status(400).json(resp);
  }
};
