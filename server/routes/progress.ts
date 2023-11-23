import { Router } from "express";
import { getProgress, postProgress } from "../controllers/progress";

const router = Router();

router.post("/", postProgress); // postProgress  
router.get("/", getProgress); // getProgress using params
router.patch("/"); // updateProgress using params
router.delete("/"); // deleteProgress using params

export default router;