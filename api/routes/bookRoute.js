import express from "express";
import { verify } from "../middleware/jwt.js";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
  getBookByTitle,
  getBooksCount
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/", verify, createBook);
router.delete("/:title", verify, deleteBook);
router.get("/single/:id", verify, getBook);
router.get("/:title",verify,getBookByTitle)
router.get("/", getBooks);
router.put("/:title", updateBook);
router.get("/all/count", getBooksCount);
export default router;
