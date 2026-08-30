import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./taskModel.js";

dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("========== CREATE ==========");
    const goodTask = new Task({ title: "Buy new PC" });
    const saved = await goodTask.save();
    console.log("✅ Saved:", saved);
  } catch (err) {
    console.error("❌ Validation failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

main();
