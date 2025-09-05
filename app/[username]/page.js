import React from "react";
import PaymentPage from "@/components/Paymentpage";

const Page = async ({ params }) => {
  const { username } = await params; // ✅ await required
  return <PaymentPage username={username} />;
};

export default Page;
