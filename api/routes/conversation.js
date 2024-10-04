import express from "express";
import { verify } from "../middleware/jwt.js";
import { createConversation,getConversation } from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/", createConversation);
router.get("/:userId",getConversation);

export default router;
