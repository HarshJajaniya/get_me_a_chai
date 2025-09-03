import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import payment from "@/models/payment";
import connectDb from "@/db/connectDb";

export const POST = async (req) => {
  try {
    await connectDb();

    let body = await req.formData();
    body = Object.fromEntries(body);

    let p = await payment.findOne({ oid: body.razorpay_order_id });

    if (!p) {
      return NextResponse.json({
        success: false,
        message: "Order ID not found",
      });
    }

    const isValid = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
      process.env.KEY_SECRET
    );

    if (isValid) {
      const updatepayment = await payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { done: true },
        { new: true }
      );

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/${updatepayment.to_user}?paymentdone=true`
      );
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (err) {
    console.error("Payment verification error:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
};
