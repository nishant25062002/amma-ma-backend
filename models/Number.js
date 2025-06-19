import mongoose from "mongoose";

const NumberSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    default: 0,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Number", NumberSchema);
