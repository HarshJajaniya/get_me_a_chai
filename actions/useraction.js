"use server";

import Razorpay from "razorpay";
import Payment from "@/models/payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

// Initiate a payment
export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();

  const user = await User.findOne({ username: to_username });
  if (!user) throw new Error("User not found");

  const instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: user.razorpaysecret,
  });

  const options = {
    amount: Number(amount), // in paise
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  await Payment.create({
    oid: order.id,
    amount: amount / 100, // convert paise → rupees
    to_user: user.email, // ✅ store EMAIL instead of username
    name: paymentform.name,
    message: paymentform.message,
    done: false,
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

// Fetch recent verified payments for a user (by email)
export const fetchpayments = async (username) => {
  await connectDb();

  // Find the user first (to get email)
  const user = await User.findOne({ username: decodeURIComponent(username) });
  if (!user) throw new Error("User not found");

  const payments = await Payment.find({
    to_user: user.email, // ✅ match EMAIL
    // only verified
  })
    .sort({ amount: -1 })
    .limit(10)
    .lean();

  return payments.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));
};

// Update user profile
export const updateProfile = async (form, username) => {
  const {
    name,
    email,
    username: newUsername,
    profilepic,
    coverpic,
    razorpayid,
    razorpaysecret,
  } = form;

  const safeForm = {
    name,
    email,
    username: newUsername,
    profilepic,
    coverpic,
    razorpayid,
    razorpaysecret,
  };

  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/user/${username}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(safeForm),
  });

  return res.json();
};
