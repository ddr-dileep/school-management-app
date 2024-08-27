import { Router } from "express";
import { authMiddleware } from "../../utils/token";
import {
  createClassController,
  deleteClassByIdController,
  getAllClassesBySchoolIdController,
  getOneClassByClassId,
  updateClassByIdController,
} from "../../controllers/school/schools.class.controllers";
import { createClassMiddlware } from "../../middlewares/school/school.class.middlewares";

const schoolClassRouter = Router();

schoolClassRouter.post(
  "/:schoolId/create",
  authMiddleware,
  createClassMiddlware,
  createClassController
);

schoolClassRouter.get(
  "/:schoolId/get-all",
  authMiddleware,
  getAllClassesBySchoolIdController
);

schoolClassRouter.get(
  "/:schoolId/get-one/:classId",
  authMiddleware,
  getOneClassByClassId
);

schoolClassRouter.patch(
  "/:schoolId/update/:classId",
  authMiddleware,
  updateClassByIdController
);

schoolClassRouter.delete(
  "/:schoolId/delete/:classId",
  authMiddleware,
  deleteClassByIdController
);

export default schoolClassRouter;
