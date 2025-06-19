import Subscriber from '../models/Subscriber.js';

// POST /api/subscribers
export const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if subscriber already exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Already subscribed" });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscribed successfully", subscriber: newSubscriber });
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
