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
      router.push("/dashboard");
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
        {/* Google Login */}
        <button
          onClick={() => signIn("google")}
          className="flex items-center w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg
            className="h-6 w-6 mr-2"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M44.5 20H24v8.5h11.7C34.7 33.7 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.5 4.5 29.5 2.5 24 2.5 12.7 2.5 3.5 11.7 3.5 23S12.7 43.5 24 43.5c11.3 0 20.5-9.2 20.5-20.5 0-1.4-.1-2.5-.3-3.5z"
                fill="#FFC107"
              />
              <path
                d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.5 4.5 29.5 2.5 24 2.5c-7.2 0-13 5.8-13 13 0 2.1.5 4.1 1.3 5.7z"
                fill="#FF3D00"
              />
              <path
                d="M24 44.5c5.1 0 9.8-1.7 13.4-4.7l-6.2-5.1C30.1 37 27.2 38 24 38c-6.1 0-10.7-4.1-12.5-9.6l-7 5.4C7.5 41.1 15.2 44.5 24 44.5z"
                fill="#4CAF50"
              />
              <path
                d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.1 5.5-7.7 5.5-4.6 0-8.4-3.8-8.4-8.5s3.8-8.5 8.4-8.5c2.3 0 4.3.8 5.9 2.2l6.2-6.2C34.5 4.5 29.5 2.5 24 2.5c-7.2 0-13 5.8-13 13s5.8 13 13 13c3.1 0 6-.9 8.3-2.7l6.2 6.2C34.5 43.5 29.5 44.5 24 44.5z"
                fill="#1976D2"
              />
            </g>
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
