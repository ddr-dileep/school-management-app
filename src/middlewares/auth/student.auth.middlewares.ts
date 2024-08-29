import { NextFunction, Request, Response } from "express";
import { apiError } from "../../utils/apiResponse";

export const studentCreateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, username, password, cls } = req.body;
  if (!name || !username || !password || !cls) {
    return res.status(400).json(
      apiError({
        name: name ? undefined : "Name is required",
        username: username ? undefined : "Username is required",
        password: password ? undefined : "Password is required",
        cls: cls ? undefined : "Class ID is required",
      })
    );
  }
  next();
};
