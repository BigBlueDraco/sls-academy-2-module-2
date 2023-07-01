import { NextFunction, Router, Response } from "express";
import AuthController from "../controllers/authController/authController";
import { User } from "../controllers/UserController/userTypes";
const router: Router = Router();

router.post("/sign-up", async (req: { body: User }, res: Response) => {
  try {
    const data = await AuthController.registration(req.body);
    res.status(200).json(data).end;
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: `${e}` });
  }
});
router.post("/sign-in", async (req: { body: User }, res: Response) => {
  try {
    const data = await AuthController.login(req.body);
    res.status(200).json(data).end;
  } catch (e) {
    res.status(400).json(`${e}`);
  }
});
router.post("/refresh", async (req: any, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(401).json("Unauthorized");
    }
    const user = await AuthController.refresh(refreshToken, res);
    res.status(200).json(user).end;
  } catch (e) {
    res.status(400).json(`${e}`);
  }
});

export default router;
