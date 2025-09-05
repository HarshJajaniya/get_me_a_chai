import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true }, // fixed typo "requied"
  name: { type: String },
  username: { type: String, required: true },
  profilepic: { type: String },
  coverpic: { type: String },
  razorpayid: { type: String },
  razorpaysecret: { type: String },
  createdat: { type: Date, default: Date.now },
  updatedat: { type: Date, default: Date.now },
});

// ✅ Prevent recompiling model on hot reload
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
