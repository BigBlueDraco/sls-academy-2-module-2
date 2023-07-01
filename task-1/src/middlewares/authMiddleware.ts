import { NextFunction, Request, Response } from "express";
import TokenController from "../controllers/TokenController/tokenController";

export const tokenMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader: string = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json("Unauthorize");
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      res.status(401).json("Unauthorize");
    }
    const userData = TokenController.validate(accessToken);
    req.body = { email: userData.email };
    next();
  } catch {}
};
