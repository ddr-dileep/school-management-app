import { Router } from "express";
import {
  activateSuperAdmin,
  deleteSuperAdmin,
  getSuperAdmin,
  loginSuperAdmin,
  registerSuperAdminController,
  updateSuperAdmin,
} from "../../controllers/auth/super-admin.auth.controllers";
import {
  loginSuperAdminMiddleware,
  registerSuperAdminMiddleware,
} from "../../middlewares/auth/super-admin.auth.middlewares";
import { authMiddleware } from "../../utils/token";

const authRouter = Router();

authRouter.post(
  "/register/super-admin",
  registerSuperAdminMiddleware,
  registerSuperAdminController
);

authRouter.post(
  "/login/super-admin",
  loginSuperAdminMiddleware,
  loginSuperAdmin
);

authRouter.get("/info/super-admin", authMiddleware, getSuperAdmin);

authRouter.patch("/update/super-admin", authMiddleware, updateSuperAdmin);

authRouter.delete("/delete/super-admin", authMiddleware, deleteSuperAdmin);

authRouter.patch("/activate/super-admin", authMiddleware, activateSuperAdmin);

export default authRouter;
