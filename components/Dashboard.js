"use client";
import React, { useState } from "react";

const Dashboard = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayid: "",
    razorpaysecret: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div className="container mx-auto py-5 px-6">
      <h1 className="text-center my-5 text-3xl font-bold">
        Welcome to your Dashboard
      </h1>

      <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="my-2">
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            value={form.name}
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            className="block w-full p-2 border rounded-lg bg-slate-100"
          />
        </div>

        {/* Email */}
        <div className="my-2">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            value={form.email}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            className="block w-full p-2 border rounded-lg bg-slate-100"
          />
        </div>

        {/* Username */}
        <div className="my-2">
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>
          <input
            value={form.username}
            onChange={handleChange}
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            className="block w-full p-2 border rounded-lg bg-slate-100"
          />
        </div>

        {/* Profile Picture */}
        <div className="my-2">
          <label htmlFor="profilepic" className="block mb-1 font-medium">
            Profile Picture (NEXT_PUBLIC_URL)
          </label>
          <input
            value={form.profilepic}
            onChange={handleChange}
            type="text"
            name="profilepic"
            id="profilepic"
            autoComplete="photo"
            className="block w-full p-2 border rounded-lg bg-slate-100"
          />
        </div>

        {/* Cover Picture */}
        <div className="my-2">
          <label htmlFor="coverpic" className="block mb-1 font-medium">
            Cover Picture (NEXT_PUBLIC_URL)
          </label>
          <input
            value={form.coverpic}
            onChange={handleChange}
            type="text"
            name="coverpic"
            id="coverpic"
            autoComplete="off"
            className="block w-full p-2 border rounded-lg bg-slate-100"
          />
        </div>

        {/* Razorpay ID */}
        <div className="my-2">
          <label htmlFor="razorpayid" className="block mb-1 font-medium">
            Razorpay Key ID
          </label>
          <input
            value={form.razorpayid}
            onChange={handleChange}
            type="password"
            name="razorpayid"
            id="razorpayid"
            autoComplete="new-password"
            className="block w-full p-2 border rounded-lg bg-slate-100"
          />
        </div>

        {/* Razorpay Secret */}
        <div className="my-2">
          <label htmlFor="razorpaysecret" className="block mb-1 font-medium">
            Razorpay Secret
          </label>
          <input
            value={form.razorpaysecret}
            onChange={handleChange}
            type="text"
            name="razorpaysecret"
            id="razorpaysecret"
            className="block w-full p-2 border rounded-lg bg-slate-100"
          />
        </div>

        {/* Submit */}
        <div className="my-6">
          <button
            type="submit"
            className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
