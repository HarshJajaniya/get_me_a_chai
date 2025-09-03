import React from "react";
import PaymentPage from "@/components/Paymentpage";

const page = ({ params }) => {
  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
};

export default page;
