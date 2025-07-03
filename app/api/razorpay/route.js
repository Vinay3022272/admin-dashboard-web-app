import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDb from "@/db/connectDB";

export const POST = async (req) => {
  try {
    await connectDb();

    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    console.log(" Incoming callback body:", body);

    const paymentDoc = await Payment.findOne({
      order_id: body.razorpay_order_id,
    });

    console.log("Fetched payment from DB:", paymentDoc);

    if (!paymentDoc) {
      return NextResponse.json({
        success: false,
        message: "Order not found",
      });
    }

    const user = await User.findOne({ username: paymentDoc.to_user });

    console.log("Fetched user:", user);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const secret = user.razorpaysecret;

    const isValid = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
      secret
    );

    console.log("Signature valid:", isValid);

    if (!isValid) {
      return NextResponse.json({
        success: false,
        message: "Payment signature invalid",
      });
    }

    const updatedPayment = await Payment.findOneAndUpdate(
      { order_id: body.razorpay_order_id },
      { done: true },
      { new: true }
    );

    console.log("Payment updated:", updatedPayment);

    // Do a meta redirect so Razorpay forwards the user
    return new NextResponse(
      `<html><head><meta http-equiv="refresh" content="0; URL='${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true'" /></head></html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } catch (err) {
    console.error(" Server error:", err);
    return NextResponse.json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
};
