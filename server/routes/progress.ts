import { Router } from "express";
import {
  deleteProgress,
  getProgress,
  postProgress,
  updateProgress,
} from "../controllers/progress";

const router = Router();

router.post("/", postProgress); // postProgress
router.get("/", getProgress); // getProgress using params
router.put("/", updateProgress); // updateProgress
router.delete("/", deleteProgress); // deleteProgress using params

export default router;
