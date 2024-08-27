import { Router } from "express";
import authRouter from "./auth/super-admin.auth.routers";
import adminRouter from "./auth/admin.auth.routers";
import schoolRouter from "./school/school.routers";
import schoolClassRouter from "./school/school.class.routers";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/auth/admin", adminRouter);

rootRouter.use("/school", schoolRouter);
rootRouter.use("/school/class", schoolClassRouter);

export default rootRouter;
