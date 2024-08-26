import { Router } from "express";
import {
  activateAdminController,
  deleteAdminController,
  getAdminInfoController,
  loginAdminController,
  registerAdminController,
  updateAdminController,
} from "../../controllers/auth/admin.auth.controllers";
import {
  loginAdminMiddleware,
  registerAdminMiddleware,
} from "../../middlewares/auth/admin.auth.middlewares";
import { authMiddleware } from "../../utils/token";

const adminRouter = Router();

adminRouter.post(
  "/register",
  registerAdminMiddleware,
  authMiddleware,
  registerAdminController
);

adminRouter.post("/login", loginAdminMiddleware, loginAdminController);

adminRouter.get("/user-info", authMiddleware, getAdminInfoController);

adminRouter.delete("/delete", authMiddleware, deleteAdminController);

adminRouter.patch(
  "/activate/:adminId",
  authMiddleware,
  activateAdminController
);

adminRouter.patch("/update", authMiddleware, updateAdminController);

export default adminRouter;
