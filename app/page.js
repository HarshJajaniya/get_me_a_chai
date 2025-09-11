import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center text-white p-4 min-h-[44vh]">
        <div className="font-bold text-3xl text-center">Buy me a chai!</div>
        <p className="text-center text-base">
          Crowd Funding start now. Start funding your favourite creator
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
            >
              Start Now
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
            >
              Read more
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      {/* buying section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center py-10 gap-8 md:gap-0">
        <div className="flex flex-col justify-center items-center gap-1 w-full md:w-1/3">
          <div className="rounded-lg overflow-hidden w-[100px] h-[100px] mx-4">
            <img
              src="/man.gif"
              alt="Animated man"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-white pb-1 p-5 font-bold text-lg text-center">
            Your fans can buy
          </h1>
          <p className="text-lg font-bold text-white pt-2 text-center">
            Your fans want to fund
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 w-full md:w-1/3">
          <div className="rounded-lg overflow-hidden w-[100px] h-[100px] mx-4">
            <img
              src="/fans.gif"
              alt="Animated man"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-white pb-1 p-5 font-bold text-lg text-center">
            Your fans want to fund
          </h1>
          <p className="text-white pt-2 text-center">
            Your fans are available for you to help
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 w-full md:w-1/3">
          <div className="rounded-lg overflow-hidden w-[100px] h-[100px] mx-4">
            <img
              src="/man.gif"
              alt="Animated man"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-white pb-1 p-5 font-bold text-lg text-center">
            Your fans can buy
          </h1>
          <p className="text-lg font-bold text-white pt-2 text-center">
            Fund Yourself
          </p>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>
      {/* learn more section */}
      <div className="container mx-auto flex flex-col items-center py-10">
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <img
            src="/thm.png"
            alt="Notion Portfolio"
            className="w-full max-w-md h-[220px] md:h-[400px] object-cover rounded-[8px] shadow-gradient"
          />
          <a
            href="https://harshjajaniya.notion.site/ebd/10b7404d2bdc8065af9dfa0f61535f50"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-md text-center inline-block font-semibold mt-4 px-4 py-2 bg-white text-blue-950 rounded hover:bg-purple-400 hover:text-white"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </>
  );
}
