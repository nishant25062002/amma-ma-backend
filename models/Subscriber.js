import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, default:"" },
    number: { type: String, default:"" },
  },
  { timestamps: true }
);

export default mongoose.model('Subscriber', subscriberSchema);
