import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center text-white p-4 h-[44vh] ">
        <div className="font-bold text-3xl ">Buy me a chai!</div>
        <p>Crowd Funding start now. Start funding your favourite crator</p>
        <div>
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Start Now
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Read more
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      {/* buying section */}
      <div className="container justify-around mx-auto flex py-20">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="rounded-lg overflow-hidden w-[100px] h-[100px] mx-4">
            <img
              src="/man.gif"
              alt="Animated man"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-white pb-1 p-5 font-bold text-lg">
            Your fans can buy
          </h1>
          <p className="text-lg font-bold text-white pt-2">
            Your fans want to fund
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="rounded-lg overflow-hidden w-[100px] h-[100px] mx-4">
            <img
              src="/fans.gif"
              alt="Animated man"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-white pb-1 p-5 font-bold text-lg">
            Your fans want to fund
          </h1>
          <p className=" text-white pt-2">
            Your fans are available for you to help
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="rounded-lg overflow-hidden w-[100px] h-[100px] mx-4">
            <img
              src="/man.gif"
              alt="Animated man"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-white pb-1 p-5 font-bold text-lg">
            Your fans can buy
          </h1>
          <p className="text-lg font-bold text-white pt-2">Fund Yourself</p>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>
      {/* learn more section */}
      <div className="container justify-around mx-auto flex py-20">
        <div className="flex flex-col justify-center items-center gap-1">
          <img
            src="/thm.png"
            alt="Notion Portfolio"
            className="w-full h-[400px] object-cover rounded-[8px] shadow-gradient"
          />
          <a
            href="https://harshjajaniya.notion.site/ebd/10b7404d2bdc8065af9dfa0f61535f50"
            target="_blank"
            rel="noopener noreferrer"
            className=" w-full text-center inline-block font-semibold mt-8 px-4 py-2 bg-white text-blue-950 rounded hover:bg-purple-400 hover:text-white"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </>
  );
}
