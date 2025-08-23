"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  return (
    <div className="text-white container mx-auto py-14">
      <h1 className="font-bold text-center text-3xl">Login to support me</h1>
      <div className="login-button">
        <div className=" container mx-auto items-center flex flex-col gap-2 min-h-screen  p-10">
          {/* Google */}
          <button className="flex mb-4 items-center text-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium  hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <svg
              className="h-6 w-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-0.5 0 48 48"
              version="1.1"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-401, -860)">
                  <g transform="translate(401, 860)">
                    <path
                      d="M9.82727273,24C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333L2.62345455,13.6042667C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667L10.5247955,28.3370667C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                      fill="#FBBC05"
                    />
                    <path
                      d="M23.7136364,10.1333333C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667L39.2022727,6.4C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667L10.5322727,19.6437333C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                      fill="#EB4335"
                    />
                    <path
                      d="M23.7136364,37.8666667C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667L2.62345455,34.3946667C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333L31.5177727,35.8144C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                      fill="#34A853"
                    />
                    <path
                      d="M46.1454545,24C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333L23.7136364,19.7333333V28.8H36.3181818C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144L39.0249545,41.6181333C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                      fill="#4285F4"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* LinkedIn */}
          <button className="flex mb-6 items-center text-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <svg
              className="h-6 w-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -2 44 44"
              version="1.1"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-702, -265)" fill="#007EBB">
                  <path d="M746,305L736.2754,305V290.9384C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511V305H716.921919C716.921919,305 717.046096,280.091247 716.921919,277.827047H726.555974V282.091631C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794C741.21143,277.565794 746,281.474355 746,289.890824V305ZM707.17921,274.428187C704.0127,274.428187 702,272.350964 702,269.717936C702,267.033681 704.072201,265 707.238711,265C710.402634,265 712.348071,267.028559 712.41016,269.710252C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187ZM703.109831,277.827047H711.685795V305H703.109831V277.827047Z" />
                </g>
              </g>
            </svg>
            <span>Continue with LinkedIn</span>
          </button>

          {/* Github */}
          <button className="flex mb-6 items-center text-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <svg
              className="h-6 w-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.76.08-.74.08-.74 1.21.09 1.84 1.24 1.84 1.24 1.08 1.84 2.84 1.31 3.53 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.45 11.45 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.8 5.65-5.47 5.95.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            <span>Continue with GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
