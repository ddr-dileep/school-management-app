import { NextFunction, Request, Response } from "express";

export const createClassMiddlware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const { schoolId } = req.params;

  if (!name || !schoolId) {
    return res.status(400).json({
      name: name ? undefined : "Name is required",
      schoolId: schoolId ? undefined : "School ID is required",
    });
  }

  next();
};
