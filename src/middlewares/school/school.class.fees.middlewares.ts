import { NextFunction, Request, Response } from "express";

export const createFeesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount } = req.body;
  const { classId } = req.params;

  if (!amount || !classId) {
    return res.status(400).json({
      amount: amount ? undefined : "Amount is required",
      classId: classId ? undefined : "Class ID is required",
    });
  }

  next();
};
