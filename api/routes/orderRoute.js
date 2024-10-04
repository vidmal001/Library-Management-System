import express from "express";
import { verify } from "../middleware/jwt.js";
import {createOrder,getUnapprovedOrders,approveOrder,getApprovedOrders,deleteOrder,getNotCompletedOrders,CompletedOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/",verify,createOrder); 
router.get('/unapproved-orders', getUnapprovedOrders);
router.put('/approve/:id',verify,approveOrder);
router.get('/approved-orders/:title',verify, getApprovedOrders);
router.delete('/:id',verify,deleteOrder);
router.get('/all/notCompleted',verify,getNotCompletedOrders);
router.put('/Complete/:id',verify,CompletedOrder);

export default router;