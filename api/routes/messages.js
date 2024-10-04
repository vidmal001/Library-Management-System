import express from "express";
import { verify } from "../middleware/jwt.js";
import {
  createMessage,
  fetchMessages,
} from "../controllers/messages.controller.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/:conversationId", fetchMessages);

export default router;
