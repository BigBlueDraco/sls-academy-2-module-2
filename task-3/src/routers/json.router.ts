import Router from "express";
import jsonController from "../controllers/json.controller";

const router = Router();

router.post("/:bucketName/:name", jsonController.create);
router.get("/:bucketName/:name", jsonController.getOne);
export default router;
