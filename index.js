import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// import productRoutes from './routes/productRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
// import contentRoutes from './routes/contentRoutes.js';

dotenv.config();

// Attempt DB connection with proper error handling
try {
  await connectDB();
} catch (err) {
  console.error("❌ Failed to connect to MongoDB:", err);
  process.exit(1); // Avoid continuing if DB fails
}

const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send({ message: "Amma-ma server is running!!" });
});

// Routes
// app.use('/products', productRoutes);
app.use("/orders", orderRoutes);
app.use("/subscribers", subscriberRoutes);

// Centralized error handler (must come before app.listen)
app.use((err, req, res, next) => {
  console.error("💥 Express error:", err.stack || err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// Handle unhandled promise rejections globally
process.on("unhandledRejection", (reason, promise) => {
  console.error("🔴 Unhandled Rejection:", reason);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Amma-ma backend running on port ${PORT}`)
);
