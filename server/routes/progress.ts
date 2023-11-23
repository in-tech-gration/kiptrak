import { Router } from "express";
import { deleteProgress, getProgress, postProgress } from "../controllers/progress";

const router = Router();

router.post("/", postProgress); // postProgress  
router.get("/", getProgress); // getProgress using params
router.patch("/"); // updateProgress using params
router.delete("/", deleteProgress); // deleteProgress using params

export default router;