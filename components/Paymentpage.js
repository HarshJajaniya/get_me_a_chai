"use client";
import Script from "next/script";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useraction";

const PaymentPage = ({ username }) => {
  const [paymentform, setpaymentform] = useState({});
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setpayments] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    getdata();
  }, []);

  const Handlechange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  //the supporter section: whichever payments are marked as done are to be shown;

  const getdata = async () => {
    let u = await fetchuser(username);
    let dbpayments = await fetchpayments(username);
    setcurrentUser(u);
    setpayments(dbpayments);
    console.log(u, dbpayments);
  };

  const pay = async (amount) => {
    const finalAmount = amount * 100; // convert to paise
    let a = await initiate(finalAmount, username, paymentform);
    let order_id = a.id;

    var options = {
      key: process.env.NEXT_PUBLIC_KEY_ID,
      amount: finalAmount, // in paise
      currency: "INR",
      name: "Get Me A Chai",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentform.name,
        email: "gaurav.kumar@example.com",
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

    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className=" w-full bg-red-800 relative">
        <img
          className="object-cover w-full h-[350px]"
          src="https://i.pinimg.com/736x/14/9f/c7/149fc77b1f039b058cbf6c3c1d108430.jpg"
        />
        <div className="border-white border-4 rounded-full absolute -bottom-20 right-[45%]">
          <img
            className="rounded-full"
            width={150}
            height={150}
            src="/profile.jpeg"
            alt="profile"
          />
        </div>
      </div>
      <div className="info flex flex-col justify-center items-center my-24 gap-2">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-600">Make with Love❤️</div>
        <div className="text-slate-600">Since 2025.</div>
        <div className="payment flex gap-4 w-[80%]">
          <div className="supports w-1/2 bg-slate-900 rounded-2xl text-white my-5 p-5">
            <h1 className="font-bold text-2xl my-5">Supports</h1>
            <ul className="mx-5">
              <ul>
                {payments.map((pay, i) => (
                  <li key={i} className="my-4 flex gap-2 items-center">
                    <img width={40} src="avatar.gif" alt="avatar" />
                    <span>
                      {pay.name} donated{" "}
                      <span className="text-green-300 font-bold">
                        ₹{pay.amount}
                      </span>{" "}
                      with msg "{pay.message}"
                    </span>
                  </li>
                ))}
              </ul>
            </ul>
          </div>
          <div className="makepayment w-1/2 bg-slate-900 rounded-2xl text-white my-5 p-5">
            <h1 className="font-bold text-2xl my-5">Make a Payment</h1>
            <div className="flex gap-2 flex-col">
              <input
                onChange={Handlechange}
                value={paymentform.name || ""}
                name="name"
                className="bg-slate-700 hover:border hover:border-white rounded-md w-full p-4 text-white"
                type="text"
                placeholder="Enter Name"
              />
              <input
                onChange={Handlechange}
                value={paymentform.message || ""}
                name="message"
                className="bg-slate-700 hover:border hover:border-white rounded-md w-full p-4 text-white"
                type="text"
                placeholder="Enter Message"
              />
              <input
                onChange={Handlechange}
                value={paymentform.amount || ""}
                name="amount"
                className="bg-slate-700 hover:border hover:border-white rounded-md w-full p-4 text-white"
                type="number" // ✅ better for amounts
                placeholder="Enter Amount"
              />
              <button
                type="button"
                onClick={() => pay(paymentform.amount)} // ✅ call pay with form amount
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Pay
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              <div
                className="bg-slate-400 p-4 rounded"
                onClick={() => pay(1000)}
              >
                Pay ₹20
              </div>
              <div
                className="bg-slate-400 p-4 rounded"
                onClick={() => pay(2000)}
              >
                Pay ₹30
              </div>
              <div
                className="bg-slate-400 p-4 rounded"
                onClick={() => pay(3000)}
              >
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
