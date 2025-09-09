"use server";

import Razorpay from "razorpay";
import payment from "@/models/payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;

  var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);

  // create a payment object which shows a pending payment in the database
  await payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });

  return x;
};

export const fetchuser = async (email) => {
  await connectDb();
  const u = await User.findOne({ email: email.toLowerCase() });
  if (!u)
    return {
      name: "",
      email: "",
      username: "",
      profilepic: "",
      coverpic: "",
      razorpayid: "",
      razorpaysecret: "",
    };
  return u.toObject({ flattenObjectIds: true });
};

export const fetchpayments = async (username) => {
  await connectDb();
  // find all payments sorted by decreasing order of amount and flatten object ids
  let p = await payment
    .find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean();
  return p;
};

export const updateProfile = async (data, oldusername) => {
  try {
    await connectDb();

    // no Object.fromEntries, just use the plain object
    let ndata = { ...data };

    // If the username is being updated, check if it's available
    if (oldusername !== ndata.username) {
      let existingUser = await User.findOne({ username: ndata.username });
      if (existingUser) {
        return { error: "Username already exists" };
      }

      // update user
      const updatedUser = await User.findOneAndUpdate(
        { email: ndata.email },
        ndata,
        { new: true, runValidators: true }
      );

      // update all usernames in the Payments table
      await payment.updateMany(
        { to_user: oldusername },
        { to_user: ndata.username }
      );

      return JSON.parse(JSON.stringify(updatedUser));
    } else {
      // just update user without username change
      const updatedUser = await User.findOneAndUpdate(
        { email: ndata.email },
        ndata,
        { new: true, runValidators: true }
      );
      return JSON.parse(JSON.stringify(updatedUser));
    }
  } catch (err) {
    console.error("❌ updateProfile error:", err);
    throw new Error("Update failed: " + err.message);
  }
};
