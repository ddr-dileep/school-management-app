import { Router } from "express";
import {
  createStudentController,
  getAllStudentControllers,
  getStudentsOfOneSchool,
} from "../../controllers/auth/student.auth.controllers";
import { authMiddleware } from "../../utils/token";
import { studentCreateMiddleware } from "../../middlewares/auth/student.auth.middlewares";

const studentRouter = Router();
export default studentRouter;

studentRouter.get("/get-all", authMiddleware, getAllStudentControllers);

studentRouter.get("/get-all/:schoolId", authMiddleware, getStudentsOfOneSchool);

studentRouter.post(
  "/create",
  studentCreateMiddleware,
  authMiddleware,
  createStudentController
);
