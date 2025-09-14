import React from "react";
import PaymentPage from "@/components/Paymentpage";
import { notFound } from "next/navigation";
import User from "@/models/User";
import { connect } from "mongoose";
import connectDb from "@/db/connectDb";

const Page = async ({ params }) => {
  await connectDb();
  const user = await User.findOne({ username: params.username }).lean();
  if (!user) {
    notFound();
  }
  return <PaymentPage username={params.username} />;
};

export default Page;

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get me a chai`,
  };
}
