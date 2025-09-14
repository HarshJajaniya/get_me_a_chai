"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchuser, fetchpayments, initiate } from "@/actions/useraction";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SmartImage from "./smartImage";

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Fetch user & payments
  const getData = async () => {
    try {
      const u = await fetchuser(username);
      if (!u || !u.username) throw new Error("User not found");
      setCurrentUser(u);

      const dbPayments = await fetchpayments(username);
      setPayments(dbPayments);
    } catch (err) {
      console.error("Error fetching user/payments:", err);
      toast.error("Failed to load user data", { theme: "light" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Show toast after payment done
  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast.success("Thanks for your donation!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      router.replace(`/${username}`);
      // Refresh data after redirect
      getData();
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const pay = async (amount) => {
    if (!currentUser?.razorpayid || !currentUser?.razorpaysecret) {
      toast.error(
        "Razorpay credentials not found. Ask the user to update their dashboard.",
        { theme: "light" }
      );
      return;
    }

    try {
      const order = await initiate(amount, username, paymentform);

      if (typeof window === "undefined") return;

      const returnUrl = `${window.location.origin}/${username}?paymentdone=true`;

      const options = {
        key: currentUser.razorpayid,
        amount,
        currency: "INR",
        name: username,
        description: paymentform.message || "Support Transaction",
        image: currentUser.profilepic || "/img.png",
        order_id: order.id,
        return_url: returnUrl,
        prefill: {
          name: paymentform.name,
          email: currentUser.email || "",
        },
        notes: { address: "Razorpay Corporate Office" },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      toast.error("Payment failed. Try again.", { theme: "light" });
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!currentUser)
    return <div className="text-center py-10">User not found</div>;

  const totalAmount = payments.reduce((a, b) => a + b.amount, 0);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="light"
        transition={Bounce}
      />

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      {/* Cover & Profile */}
      <div className="cover w-full bg-red-50 relative">
        <SmartImage
          className="object-cover w-full h-48 md:h-[350px]"
          src={currentUser?.coverpic}
          fallback="/cover.png"
          alt="cover"
          width={1200}
          height={350}
          priority
        />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 border-white overflow-hidden border-2 rounded-full">
          <SmartImage
            className="rounded-full"
            src={currentUser?.profilepic}
            fallback="/img.png"
            alt="profile"
            width={180}
            height={180}
            priority
          />
        </div>
      </div>

      {/* User Info */}
      <div className="info flex justify-center items-center my-24 mb-32 flex-col gap-2">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">Let's help {username} get a chai!</div>
        <div className="text-slate-400">
          {payments.length} Payments &bull; ₹{totalAmount} raised
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
          {/* Supporters List */}
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white px-2 md:p-10">
            <h2 className="text-2xl font-bold my-5">Top 10 Supporters</h2>
            <ul className="mx-5 text-lg text-[14px]">
              {payments.length === 0 && <li>No payments yet</li>}
              {payments.map((p, i) => (
                <li key={i} className="my-4 flex gap-2 items-center">
                  <SmartImage
                    src="/avatar.gif"
                    fallback="/img.png"
                    width={33}
                    height={33}
                    alt="user avatar"
                  />
                  <span>
                    {p.name} donated{" "}
                    <span className="font-bold">₹{p.amount}</span> with a
                    message "{p.message}"
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Form */}
          <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white px-2 md:p-10">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <input
                onChange={handleChange}
                value={paymentform.name}
                name="name"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800 text-white"
                placeholder="Enter Name"
              />
              <input
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800 text-white"
                placeholder="Enter Message"
              />
              <input
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                type="number"
                className="w-full p-3 rounded-lg bg-slate-800 text-white"
                placeholder="Enter Amount"
              />
              <button
                onClick={() => pay(Number(paymentform.amount) * 100)}
                type="button"
                className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-3 disabled:bg-slate-600"
                disabled={
                  !paymentform.name ||
                  paymentform.name.length < 3 ||
                  !paymentform.message ||
                  paymentform.message.length < 4 ||
                  !paymentform.amount ||
                  paymentform.amount <= 0
                }
              >
                Pay
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-2 mt-5">
              {[10, 20, 30].map((amt) => (
                <button
                  key={amt}
                  className="bg-slate-800 p-3 rounded-lg text-white"
                  onClick={() => pay(amt * 100)}
                >
                  Pay ₹{amt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
