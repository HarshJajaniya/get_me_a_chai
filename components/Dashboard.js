"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useraction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { data: session } = useSession();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.username) {
      getData();
    } else if (!session) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // Fetch user data
  const getData = async () => {
    try {
      setLoading(true);
      const data = await fetchuser(session.user.username);
      setForm((prev) => ({
        ...prev,
        name: data.name || "",
        email: data.email || "",
        username: data.username || "",
        profilepic: data.profilepic || "",
        coverpic: data.coverpic || "",
        razorpayid: data.razorpayid || "",
        razorpaysecret: data.razorpaysecret || "",
      }));
    } catch (err) {
      console.error("Error fetching user:", err);
      toast.error("❌ Failed to fetch user data", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only allowed fields
      const allowedFields = [
        "name",
        "email",
        "username",
        "profilepic",
        "coverpic",
        "razorpayid",
        "razorpaysecret",
      ];
      const safeForm = {};
      allowedFields.forEach((field) => {
        if (form[field] !== undefined) safeForm[field] = form[field];
      });

      const res = await updateProfile(safeForm, session.user.username);
      if (res?.error) {
        toast.error(res.error, { theme: "dark" });
      } else {
        toast.success("✅ Profile Updated", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (err) {
      console.error("Update Failed:", err);
      toast.error("❌ Update Failed", { theme: "dark" });
    }
  };

  const inputClass =
    "block w-full p-2 text-white border border-gray-600 rounded-lg text-xs bg-gray-800 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500";

  if (loading) {
    return (
      <div className="text-center text-white mt-20">Loading dashboard...</div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto py-5 px-6">
        <h1 className="text-center my-5 text-3xl font-bold text-white">
          Welcome to your Dashboard
        </h1>

        <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
          {[
            "name",
            "email",
            "username",
            "profilepic",
            "coverpic",
            "razorpayid",
            "razorpaysecret",
          ].map((field) => (
            <div className="my-2" key={field}>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor={field}
              >
                {field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
              <input
                value={form[field] || ""}
                onChange={handleChange}
                type={field === "email" ? "email" : "text"}
                name={field}
                id={field}
                className={inputClass}
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}

          <div className="my-6">
            <button
              type="submit"
              className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 text-sm"
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
