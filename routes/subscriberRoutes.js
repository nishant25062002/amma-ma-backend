import express from "express";
import {
  addSubscriber,
  getSubscribers,
} from "../controllers/subscriberController.js";

const router = express.Router();

router.post("/", addSubscriber); // Subscribe
router.get("/", getSubscribers); // View all (admin)

export default router;
