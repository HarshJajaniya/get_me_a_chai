// app/api/user/[username]/route.js
import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

// ✅ GET /api/user/[username]
export async function GET(req, { params }) {
  try {
    await connectDb();
    const { username } = params;

    const user = await User.findOne({ username }).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ PUT /api/user/[username]
// ✅ PUT /api/user/[username]
export async function PUT(req, { params }) {
  try {
    await connectDb();
    const { username } = params; // current username from URL
    const body = await req.json();

    // If the request is trying to change username
    if (body.username && body.username !== username) {
      const existing = await User.findOne({ username: body.username });
      if (existing) {
        return NextResponse.json(
          { error: "Username already exists" },
          { status: 400 }
        );
      }
    }

    // Update the user
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: body },
      { new: true }
    ).lean();

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.error("❌ Error updating user:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
