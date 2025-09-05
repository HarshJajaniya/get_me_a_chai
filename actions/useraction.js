"use server";

import Razorpay from "razorpay";
import payment from "@/models/payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
  var instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);
  await payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });
  return x;
};

export const fetchuser = async (username) => {
  await connectDb();
  let u = await User.findOne({ username: username }).lean(); // ✅ use .lean()
  return u ? JSON.parse(JSON.stringify(u)) : null; // ✅ safe for Client Components
};

export const fetchpayments = async (username) => {
  await connectDb();
  let p = await payment
    .find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean(); // ✅ plain objects already

  return JSON.parse(JSON.stringify(p)); // ✅ safe for Client Components
};
