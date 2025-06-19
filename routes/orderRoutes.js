import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-order", createOrder); // POST: Create new order
router.get("/all-orders", getAllOrders); // GET: Get all orders
router.get("/get-order/:orderId", getOrder); // GET: Get all orders

export default router;
