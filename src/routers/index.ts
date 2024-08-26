import { Router } from "express";
import authRouter from "./auth/super-admin.auth.routers";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);

export default rootRouter;
