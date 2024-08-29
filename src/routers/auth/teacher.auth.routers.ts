import { Router } from "express";
import {
  activateTeacherInfoController,
  createTeacherController,
  deleteTeacherInfoController,
  getAllTeachersController,
  getOneTeacherController,
  getTeacherInfoController,
  loginTeacherController,
  updateTeacherInfoController,
} from "../../controllers/auth/teacher.auth.controllers";
import { authMiddleware } from "../../utils/token";
import {
  createTeacherMiddleware,
  loginTeacherMiddleware,
} from "../../middlewares/auth/teacher.auth.middlewares";

const teacherRouter = Router();
export default teacherRouter;

teacherRouter.post(
  "/create",
  createTeacherMiddleware,
  authMiddleware,
  createTeacherController
);

teacherRouter.get("/get-all", authMiddleware, getAllTeachersController);

teacherRouter.get("/get-one/:teacherId", getOneTeacherController);

teacherRouter.post("/login", loginTeacherMiddleware, loginTeacherController);

teacherRouter.get("/get-info", authMiddleware, getTeacherInfoController);

teacherRouter.patch(
  "/update-info",
  authMiddleware,
  updateTeacherInfoController
);

teacherRouter.delete(
  "/de-activate/:teacherId",
  authMiddleware,
  deleteTeacherInfoController
);

teacherRouter.patch(
  "/activate/:teacherId",
  authMiddleware,
  activateTeacherInfoController
);
