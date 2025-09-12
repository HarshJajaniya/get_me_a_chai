"use client";

import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.username) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="text-white container mx-auto py-14">
      <h1 className="font-bold text-center text-3xl mb-8">
        Login to support me
      </h1>
      <div className="flex flex-col items-center gap-6 min-h-[40vh] p-6">
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
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          <span>Continue with GitHub</span>
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
