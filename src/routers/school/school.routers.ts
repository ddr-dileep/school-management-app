import { Router } from "express";
import {
  activateSchoolController,
  createSchoolController,
  deleteSchoolByIdController,
  getAllSchoolController,
  getSchoolByIdController,
  updateSchoolByIdController,
} from "../../controllers/school/school.controllers";
import { authMiddleware } from "../../utils/token";
import { createSchoolMiddleware } from "../../middlewares/school/school.middlewares";

const schoolRouter = Router();

schoolRouter.post(
  "/create",
  authMiddleware,
  createSchoolMiddleware,
  createSchoolController
);

schoolRouter.get("/get-all", authMiddleware, getAllSchoolController);

schoolRouter.get("/get-one/:schoolId", authMiddleware, getSchoolByIdController);

schoolRouter.patch(
  "/update/:schoolId",
  authMiddleware,
  updateSchoolByIdController
);

schoolRouter.delete(
  "/delete/:schoolId",
  authMiddleware,
  deleteSchoolByIdController
);

schoolRouter.patch(
  "/activate/:schoolId",
  authMiddleware,
  activateSchoolController
);

export default schoolRouter;
