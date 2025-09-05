"use client";

import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect user after login
  useEffect(() => {
    if (session?.user?.username) {
      router.push(`/${session.user.username}`);
    }
  }, [session, router]);

  return (
    <div className="text-white container mx-auto py-14">
      <h1 className="font-bold text-center text-3xl">Login to support me</h1>

      <div className="container mx-auto items-center flex flex-col gap-6 min-h-screen p-10">
        {/* Github Login */}
        <button
          onClick={() => signIn("github")}
          className="flex items-center w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg
            className="h-6 w-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 73 73"
          >
            <rect
              stroke="#000000"
              strokeWidth="2"
              fill="#000000"
              x="-1"
              y="-1"
              width="71"
              height="71"
              rx="14"
            ></rect>
            <path
              d="M58.3067,21.4282 C55.8957,17.2972 52.6254,14.0267 48.4948,11.616 C44.3636,9.2051 39.8536,8 34.9615,8 C30.07,8 25.5585,9.2055 21.4282,11.616 C17.2972,14.0266 14.027,17.2972 11.616,21.4282 C9.2054,25.559 8,30.0699 8,34.9608 C8,40.8358 9.7141,46.1187 13.143,50.811 C16.5716,55.5036 21.0009,58.7507 26.4304,60.5527 ..."
              fill="#FFFFFF"
            ></path>
          </svg>
          <span>Continue with Github</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
