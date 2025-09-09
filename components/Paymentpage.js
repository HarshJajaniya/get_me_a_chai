"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useraction";

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const { data: session } = useSession();

  // Fetch current logged-in user from session email
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;
      const u = await fetchuser(session.user.email); // Fetch user by email
      setCurrentUser(u);
    };
    fetchData();
  }, [session]);

  // Fetch payments for the user
  useEffect(() => {
    const fetchPayments = async () => {
      if (!username) return;
      const dbPayments = await fetchpayments(username);
      setPayments(dbPayments);
    };
    fetchPayments();
  }, [username]);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const pay = async (amount) => {
    if (!currentUser) return;

    const finalAmount = Number(amount) * 100; // Convert to paise
    const order = await initiate(finalAmount, username, paymentform);

    const options = {
      key: currentUser.razorpayid,
      amount: finalAmount,
      currency: "INR",
      name: "Get Me A Chai",
      description: "Test Transaction",
      image: currentUser.profilepic || "https://example.com/default_logo.png",
      order_id: order.id,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentform.name || "",
        email: session?.user?.email || "",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!currentUser) {
    return (
      <div className="text-white text-center mt-10">Loading user data...</div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="cover w-full bg-red-50 relative">
        {currentUser.coverpic && (
          <img
            className="object-cover w-full h-48 md:h-[350px] shadow-blue-700 shadow-sm"
            src={currentUser.coverpic}
            alt="Cover"
          />
        )}
        <div className="absolute -bottom-20 right-[33%] md:right-[46%] border-white overflow-hidden border-2 rounded-full size-36">
          {currentUser.profilepic && (
            <img
              className="rounded-full object-cover size-36"
              width={128}
              height={128}
              src={currentUser.profilepic}
              alt="Profile"
            />
          )}
        </div>
      </div>

      <div className="info flex flex-col justify-center items-center my-24 gap-2">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-600">Made with ❤️</div>
        <div className="text-slate-600">Since 2025.</div>

        <div className="payment flex gap-4 w-[80%]">
          {/* Supports */}
          <div className="supports w-1/2 bg-slate-900 rounded-2xl text-white my-5 p-5">
            <h1 className="font-bold text-2xl my-5">Supports</h1>
            <ul className="mx-5">
              {payments.length === 0 ? (
                <li>No payments yet</li>
              ) : (
                payments.map((pay, i) => (
                  <li key={i} className="my-4 flex gap-2 items-center">
                    <img width={40} src="avatar.gif" alt="avatar" />
                    <span>
                      {pay.name} donated{" "}
                      <span className="text-green-300 font-bold">
                        ₹{pay.amount}
                      </span>{" "}
                      with message "{pay.message}"
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Make Payment */}
          <div className="makepayment w-1/2 bg-slate-900 rounded-2xl text-white my-5 p-5">
            <h1 className="font-bold text-2xl my-5">Make a Payment</h1>
            <div className="flex gap-2 flex-col">
              <input
                onChange={handleChange}
                value={paymentform.name || ""}
                name="name"
                className="bg-slate-700 hover:border hover:border-white rounded-md w-full p-4 text-white"
                type="text"
                placeholder="Enter Name"
              />
              <input
                onChange={handleChange}
                value={paymentform.message || ""}
                name="message"
                className="bg-slate-700 hover:border hover:border-white rounded-md w-full p-4 text-white"
                type="text"
                placeholder="Enter Message"
              />
              <input
                onChange={handleChange}
                value={paymentform.amount || ""}
                name="amount"
                className="bg-slate-700 hover:border hover:border-white rounded-md w-full p-4 text-white"
                type="number"
                placeholder="Enter Amount"
              />
              <button
                type="button"
                onClick={() => pay(paymentform.amount)}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Pay
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              <div className="bg-slate-400 p-4 rounded" onClick={() => pay(20)}>
                Pay ₹20
              </div>
              <div className="bg-slate-400 p-4 rounded" onClick={() => pay(30)}>
                Pay ₹30
              </div>
              <div className="bg-slate-400 p-4 rounded" onClick={() => pay(40)}>
                Pay ₹40
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
