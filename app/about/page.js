import React from "react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-4">About Get Me A Chai</h1>
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <video
          className="rounded-lg w-full h-100 object-cover shadow-lg"
          autoPlay
          loop
          muted
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="mb-4">
        <strong>Get Me A Chai</strong> is a simple platform that allows
        creators, developers, and anyone else to receive small payments of
        appreciation from their supporters—just like buying someone a chai!
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Create your own profile and share your unique link.</li>
        <li>Supporters can send you payments and leave a message.</li>
        <li>All payments are securely processed using Razorpay.</li>
        <li>
          Change your username anytime—your payment history stays with you!
        </li>
      </ul>
      <p className="mb-4">
        This project is built with Next.js, MongoDB, and Razorpay. It is open
        source and designed to be simple, fast, and privacy-friendly.
      </p>
      <p className="mb-4">
        Made with ❤️ by Harsh Jajaniya. <br />
        <a
          href="https://github.com/harshjajaniya/get_me_a_chai"
          className="text-blue-400 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </p>
      <p>
        Check out my portfolio:&nbsp;
        <a
          href="https://www.behance.net/ajjujajaniya"
          className="text-blue-400 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.behance.net/ajjujajaniya
        </a>
      </p>
    </div>
  );
};

export default About;

export const metadata = {
  title: "About - Get Me a Chai",
};
