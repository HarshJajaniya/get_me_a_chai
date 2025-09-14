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
export const updateProfile = async (form, username) => {
  // Only allow safe fields
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

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/user/${username}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(safeForm),
  });

  return res.json();
};
