import Router from "express";
import linkController from "../controllers/link.controller";

const router = Router();

router.post("/", linkController.create);
router.get("/:shortUrl", linkController.getOne);
export default router;
