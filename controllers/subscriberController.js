import Subscriber from "../models/Subscriber.js";
import sendEmail from "../utils/sendEmail.js";

// POST /api/subscribers
export const addSubscriber = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if subscriber already exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Already subscribed" });
    }

    const newSubscriber = new Subscriber(req.body);
    await newSubscriber.save();

    await sendEmail({
      to: email,
      subject: "🎉 Welcome to Amma-ma Foods!",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>Welcome, ${name ? name : "there"}!</h2>
      <p>Thank you for subscribing to <strong>Amma-ma Foods</strong>. We’re so glad to have you with us on this journey toward health, sweetness, and tradition — all without sugar or preservatives.</p>

      <p><strong>What to expect?</strong></p>
      <ul>
        <li>🍬 Exclusive discounts on your favorite handmade sweets</li>
        <li>📦 Early access to limited-edition gift packs</li>
        <li>📰 Health tips, updates, and behind-the-scenes stories</li>
      </ul>

      <hr style="margin: 20px 0;" />

      <p>You’ve joined a growing community of sweet-lovers who care about what goes into their bodies — and we’re here to make that journey both tasty and safe. 🤍</p>

      <p>If you ever wish to unsubscribe, just reply to this email with the word <strong>“Unsubscribe”</strong>.</p>

      <br/>
      <p>With gratitude, <br/> <strong>The Amma-ma Foods Team</strong></p>
    </div>
  `,
      bcc: "ammamaorganic@gmail.com",
    });

    res
      .status(201)
      .json({ message: "Subscribed successfully", subscriber: newSubscriber });
  } catch (error) {
    console.error("❌ Subscriber error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/subscribers
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    console.error("❌ Fetch subscribers error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
