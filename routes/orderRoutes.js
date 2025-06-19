import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder); // POST: Create new order
router.get("/", getAllOrders); // GET: Get all orders
router.get("/:orderId", getOrder); // GET: Get all orders

export default router;
