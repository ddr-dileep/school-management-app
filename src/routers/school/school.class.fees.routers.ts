import { Router } from "express";
import {
  createFeesController,
  deleteFeesController,
  getAllFeesController,
  getFeesByClassIdController,
  updateFeesController,
} from "../../controllers/school/school.class.fees.controller";
import { authMiddleware } from "../../utils/token";
import { createFeesMiddleware } from "../../middlewares/school/school.class.fees.middlewares";

const feesRouter = Router();

feesRouter.post(
  "/:classId/create",
  createFeesMiddleware,
  authMiddleware,
  createFeesController
);

feesRouter.get(
  "/:classId/get-fees",
  authMiddleware,
  getFeesByClassIdController
);

feesRouter.get("/get-all-fees", authMiddleware, getAllFeesController);

feesRouter.delete("/:feesId", authMiddleware, deleteFeesController);

feesRouter.patch("/:feesId", authMiddleware, updateFeesController);

export default feesRouter;
