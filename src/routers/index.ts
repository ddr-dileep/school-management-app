import { Router } from "express";
import authRouter from "./auth/super-admin.auth.routers";
import adminRouter from "./auth/admin.auth.routers";
import schoolRouter from "./school/school.routers";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/auth/admin", adminRouter);

rootRouter.use("/school", schoolRouter);

export default rootRouter;
