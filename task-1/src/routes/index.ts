import { Router } from "express";
import AuthRouter from "./authRoute";
import PingRoute from "./pingRoute";

const router: Router = Router();

router.use("/auth", AuthRouter);
router.use("/ping", PingRoute);

export default router;
