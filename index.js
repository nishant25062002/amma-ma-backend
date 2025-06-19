import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
// import contentRoutes from './routes/contentRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Amma-ma server is running!!" });
});
// Routes
// app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/subscribers', subscriberRoutes);
// app.use('/api/content', contentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Amma-ma backend running on port ${PORT}`));
