"use client";

import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <nav className="bg-blue-950 text-white flex justify-between px-4 h-16 items-center">
        <div className="logo font-bold text-2xl">Get me a chai!</div>
        <div>
          Signed in as {session.user.email} <br />
          <button
            onClick={() => signOut()}
            className="text-white bg-red-600 hover:bg-red-700 
                       focus:ring-4 focus:outline-none focus:ring-red-300 
                       font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Sign out
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-blue-950 text-white flex justify-between px-4 h-16 items-center">
      <div className="logo font-bold text-2xl">Get me a chai!</div>
      <div>
        <button
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
                     focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                     font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => signIn("github")}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
