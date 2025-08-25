import React from "react";

const page = ({ params }) => {
  return (
    <>
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
        <div className="font-bold text-lg">@{params.username}</div>
        <div className="text-slate-600">Make with Love❤️</div>
        <div className="text-slate-600">Since 2025.</div>
        <div className="payment flex gap-4 w-[80%]">
          <div className="supports w-1/2 bg-slate-900 rounded-2xl text-white my-5 p-5">
            <h1 className="font-bold text-2xl my-5">Supports</h1>
            <ul className="mx-5">
              <li className="my-4 flex gap-2 items-center">
                <img width={40} src="avatar.gif" alt="avatar" />
                <span>
                  Mohit Donated{" "}
                  <span className="text-green-300 font-bold">$300</span> with
                  msg "Full Power🔥"
                </span>
              </li>
              <li className="my-4 flex gap-2 items-center">
                <img width={40} src="avatar.gif" alt="avatar" />
                <span>
                  Mohit Donated{" "}
                  <span className="text-green-300 font-bold">$300</span> with
                  msg "Full Power🔥"
                </span>
              </li>
              <li className="my-4 flex gap-2 items-center">
                <img width={40} src="avatar.gif" alt="avatar" />
                <span>
                  Mohit Donated{" "}
                  <span className="text-green-300 font-bold">$300</span> with
                  msg "Full Power🔥"
                </span>
              </li>
            </ul>
          </div>
          <div className="makepayment w-1/2 bg-slate-900 rounded-2xl text-white my-5 p-5">
            <h1 className="font-bold text-2xl my-5">Make a Payment</h1>

            <div className="flex gap-2 flex-col">
              <input
                className=" bg-slate-700 hover:border hover:border-white rounded-md border-radius-2 w-full p-4 text-white"
                type="text"
                placeholder="Enter Name"
              />
              <input
                className=" bg-slate-700 hover:border hover:border-white rounded-md border-radius-2 w-full p-4 text-white"
                type="text"
                placeholder="Enter Message"
              />
              <input
                className=" bg-slate-700 hover:border hover:border-white rounded-md border-radius-2 w-full p-4 text-white"
                type="text"
                placeholder="Enter Amount"
              />
              <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Pay
              </button>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="bg-slate-400 p-4 rounded">Pay $20</div>
              <div className="bg-slate-400 p-4 rounded">Pay $30</div>
              <div className="bg-slate-400 p-4 rounded">Pay $40</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
