import { Router } from "express";
import { getProgressDraft } from "../controllers/progress";

const router = Router();

router.post("/"); // postProgress  
router.get("/draft", getProgressDraft);
router.get("/"); // getProgress using params
router.patch("/"); // updateProgress using params
router.delete("/"); // deleteProgress using params

export default router;