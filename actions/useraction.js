"use server";

import Razorpay from "razorpay";
import payment from "@/models/payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

// Initiate a payment
export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();

  const user = await User.findOne({ username: to_username });
  if (!user) throw new Error("User not found");

  const secret = user.razorpaysecret;

  const instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

  const options = {
    amount: Number(amount),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  // Store payments by email, not username
  await payment.create({
    oid: order.id,
    amount: amount / 100,
    to_user: user.email, // <-- use email here
    name: paymentform.name,
    message: paymentform.message,
  });

  return order;
};

// Fetch a single user
export const fetchuser = async (username) => {
  await connectDb();

  const u = await User.findOne({ username: decodeURIComponent(username) });
  if (!u) throw new Error("User not found");

  return u.toObject({ flattenObjectIds: true });
};

// Fetch recent payments for a user
export const fetchpayments = async (username) => {
  await connectDb();

  // Find user by username to get their email
  const user = await User.findOne({ username: decodeURIComponent(username) });
  if (!user) throw new Error("User not found");

  const payments = await payment
    .find({ to_user: user.email, done: true }) // <-- use email here
    .sort({ amount: -1 })
    .limit(10)
    .lean();

  return payments.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));
};

// Update user profile
export const updateProfile = async (data, oldusername) => {
  await connectDb();
  const ndata = { ...data };

  if (oldusername !== ndata.username) {
    const u = await User.findOne({ username: ndata.username });
    if (u) return { error: "Username already exists" };

    await User.updateOne({ email: ndata.email }, ndata);
    // No need to update payments
  } else {
    await User.updateOne({ email: ndata.email }, ndata);
    // No need to update payments
  }

  return { success: true };
};

// Run this once in a script or backend
const users = await User.find({});
for (const user of users) {
  await payment.updateMany({ to_user: user.username }, { to_user: user.email });
}
