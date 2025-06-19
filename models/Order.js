import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        title: String,
        subtitle: String,
        desc: String,
        id: String,
        price: Number,
        quantity: Number,
        weight: Number,
      },
    ],
    name: String,
    totalPrice: Number,
    email: String,
    address: String,
    phone: String,
    orderId: String,
    orderDate: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
