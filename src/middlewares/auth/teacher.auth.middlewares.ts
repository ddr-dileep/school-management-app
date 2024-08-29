import { NextFunction, Request, Response } from "express";

export const createTeacherMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, password, username, school } = req.body;

  if (!username || !password || !name || !school) {
    return res.status(400).json({
      name: name ? undefined : "name is required",
      username: username ? undefined : "UserName is required",
      password: password ? undefined : "Password is required",
      school: "School-id is required",
    });
  }

  next();
};

export const loginTeacherMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      username: username ? undefined : "UserName is required",
      password: password ? undefined : "Password is required",
    });
  }
  next();
};
