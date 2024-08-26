import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

export const createToken = async (data: any): Promise<any> => {
  const token = JWT.sign({ ...data }, process.env.JWT_SECRET!, {
    expiresIn: "10h",
  });
  return token;
};

export const verifyToken = async (token: string): Promise<any> => {
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

// auth.middleware.ts
export const authMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  console.log("toekn", token);

  try {
    const verified = await verifyToken(token);
    req.user = verified;
    console.log("verified", verified);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
