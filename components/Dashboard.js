"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useraction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayid: "",
    razorpaysecret: "",
  });

  const [currentUser, setCurrentUser] = useState(null);

  // Fetch data when session is ready
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.email) {
      const fetchData = async () => {
        try {
          const u = await fetchuser(session.user.email);
          if (u) {
            setForm(u);
            setCurrentUser(u);
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      };
      fetchData();
    }
  }, [status, session, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use session.user.username as old username
      await updateProfile(form, session.user.username);
      toast.success("✅ Profile Updated", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      // Update currentUser state in case profilepic/coverpic changed
      setCurrentUser(form);
    } catch (error) {
      console.error(error);
      toast.error("❌ Update failed");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <ToastContainer />

      {/* Cover and Profile */}
      <div className="cover w-full bg-red-50 relative">
        {currentUser?.coverpic && (
          <img
            className="object-cover w-full h-48 md:h-[350px] shadow-blue-700 shadow-sm"
            src={currentUser.coverpic}
            alt="Cover"
          />
        )}
        <div className="absolute -bottom-20 right-[33%] md:right-[46%] border-white overflow-hidden border-2 rounded-full size-36">
          {currentUser?.profilepic && (
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

      <div className="container mx-auto py-5 px-6 mt-28">
        <h1 className="text-center my-5 text-3xl font-bold text-white">
          Welcome to your Dashboard
        </h1>

        <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="my-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              value={form.name || ""}
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              placeholder="Enter your full name"
              className="block w-full p-2 text-white border border-gray-300 rounded-lg bg-gray-800 text-xs focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email (read-only) */}
          <div className="my-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              value={form.email || ""}
              type="email"
              name="email"
              id="email"
              readOnly
              className="block w-full p-2 text-gray-300 border border-gray-300 rounded-lg bg-gray-700 text-xs cursor-not-allowed"
            />
          </div>

          {/* Username */}
          <div className="my-2">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              value={form.username || ""}
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              className="block w-full p-2 text-white border border-gray-300 rounded-lg bg-gray-800 text-xs focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Profile Picture */}
          <div className="my-2">
            <label
              htmlFor="profilepic"
              className="block mb-2 text-sm font-medium text-white"
            >
              Profile Picture
            </label>
            <input
              value={form.profilepic || ""}
              onChange={handleChange}
              type="text"
              name="profilepic"
              id="profilepic"
              placeholder="Paste image URL"
              className="block w-full p-2 text-white border border-gray-300 rounded-lg bg-gray-800 text-xs focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Cover Picture */}
          <div className="my-2">
            <label
              htmlFor="coverpic"
              className="block mb-2 text-sm font-medium text-white"
            >
              Cover Picture
            </label>
            <input
              value={form.coverpic || ""}
              onChange={handleChange}
              type="text"
              name="coverpic"
              id="coverpic"
              placeholder="Paste image URL"
              className="block w-full p-2 text-white border border-gray-300 rounded-lg bg-gray-800 text-xs focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Razorpay ID */}
          <div className="my-2">
            <label
              htmlFor="razorpayid"
              className="block mb-2 text-sm font-medium text-white"
            >
              Razorpay ID
            </label>
            <input
              value={form.razorpayid || ""}
              onChange={handleChange}
              type="text"
              name="razorpayid"
              id="razorpayid"
              className="block w-full p-2 text-white border border-gray-300 rounded-lg bg-gray-800 text-xs focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Razorpay Secret */}
          <div className="my-2">
            <label
              htmlFor="razorpaysecret"
              className="block mb-2 text-sm font-medium text-white"
            >
              Razorpay Secret
            </label>
            <input
              value={form.razorpaysecret || ""}
              onChange={handleChange}
              type="text"
              name="razorpaysecret"
              id="razorpaysecret"
              className="block w-full p-2 text-white border border-gray-300 rounded-lg bg-gray-800 text-xs focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="my-6">
            <button
              type="submit"
              className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
