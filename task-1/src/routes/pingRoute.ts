import { NextFunction, Router, Response } from "express";
import { tokenMiddleware } from "../middlewares/authMiddleware";
import { User } from "../controllers/UserController/userTypes";
const router: Router = Router();

router.post("/", tokenMiddleware, async (req: any, res: Response) => {
  const resalt = await req.body;
  res.status(200).json(resalt).end;
});

export default router;
