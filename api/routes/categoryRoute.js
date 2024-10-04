import express from "express";
import { verify } from "../middleware/jwt.js";
import {createCategory,deleteCategory,getCategories,getCategorie,updateCategorie,getCategorieByTitle ,getCategoryCount} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/",verify,createCategory);
router.delete("/:title",verify,deleteCategory);
router.get("/",getCategories);
router.get("/single/:id",getCategorie);
router.get("/:title",getCategorieByTitle);
router.put("/:title",updateCategorie);
router.get("/all/count", getCategoryCount);


export default router;