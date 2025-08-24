"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <nav className="bg-blue-950 text-white flex justify-between px-4 h-16 items-center">
      <div className="logo font-bold text-2xl">Get me a chai!</div>
      <div>
        <Link href={"/login"}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
                     focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                     font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
