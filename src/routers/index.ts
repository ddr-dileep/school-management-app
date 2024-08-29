import { Router } from "express";
import authRouter from "./auth/super-admin.auth.routers";
import adminRouter from "./auth/admin.auth.routers";
import schoolRouter from "./school/school.routers";
import schoolClassRouter from "./school/school.class.routers";
import feesRouter from "./school/school.class.fees.routers";
import teacherRouter from "./auth/teacher.auth.routers";
import studentRouter from "./auth/student.auth.routers";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/auth/admin", adminRouter);
rootRouter.use("/auth/teacher", teacherRouter);
rootRouter.use("/auth/student", studentRouter);

rootRouter.use("/school", schoolRouter);
rootRouter.use("/school/class", schoolClassRouter);
rootRouter.use("/school/fees", feesRouter);

export default rootRouter;
