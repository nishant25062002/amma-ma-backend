import Order from "../models/Order.js";
import sendEmail from "../utils/sendEmail.js";
import { generateOrderId } from "./globalController.js";

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { items, name, email, address, phone } = req.body;

    if (!items || !name || !email || !address || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const orderId = await generateOrderId();
    const orderDate = new Date().toLocaleString("en-IN", {
      dateStyle: "long",
      timeStyle: "short",
    });
    const newOrder = new Order({
      items,
      name,
      email,
      address,
      phone,
      orderId,
      orderDate,
    });
    await newOrder.save();

    await sendEmail({
      to: email,
      subject: "Order Confirmation - Amma-ma Foods",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>Thank you, ${name}!</h2>
      <p>Your order has been placed successfully on <strong>${orderDate}</strong>.</p>

      <p><strong>Order Summary:</strong></p>
      <ul>
        ${items
          .map(
            (item, index) =>
              `<li>
                <strong> S. No.: </strong>${index + 1} 
                <strong> — Product Name: </strong>${item.id} 
                <strong> — Product Id: </strong> ${item.title}  
                <strong> — Qty: </strong> ${item.quantity}
                <strong> — weight: </strong> ${item.weight}
              </li>`
          )
          .join("")}
      </ul>

      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Delivery Address:</strong> ${address}</p>

      <hr style="margin: 20px 0;" />

      <p>📩 <strong>If you notice any mistake in your order</strong>, please reply to this email and let us know — we’ll fix it immediately.</p>

      <p>⚠️ <strong>If you didn’t place this order</strong>, please contact us right away by replying to this email.</p>

      <br/>
      <p>With love, <br/> <strong>Amma-ma Foods</strong></p>
    </div>
  `,
      bcc: "ammamaorganic@gmail.com",
    });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("❌ Error placing order:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
