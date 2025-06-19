import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false, // Disable command buffering
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Mongo Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
