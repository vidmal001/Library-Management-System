import express from "express";
import { deleteUser,getUser,getUserCount,getAllUsers,updateMyDetails } from "../controllers/user.controller.js";
import {verify } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", getAllUsers);
router.delete("/:id",verify,deleteUser);
router.get("/:id",verify,getUser);
router.get("/all/count", getUserCount);
router.put("/:id", verify, updateMyDetails);

export default router;
