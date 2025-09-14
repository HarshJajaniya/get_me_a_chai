import dotenv from "dotenv";
dotenv.config();
import connectDb from "../db/connectDb.js";
import User from "../models/User.js";
import payment from "../models/payment.js";

const migratePayments = async () => {
  try {
    await connectDb();

    const users = await User.find({});
    for (const user of users) {
      await payment.updateMany(
        { to_user: user.username },
        { to_user: user.email }
      );
      console.log(`Updated payments for ${user.username}`);
    }

    console.log("Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

migratePayments();
