import React from "react";

const currentyear = new Date().getFullYear();
const footer = () => {
  return (
    <footer className="bg-blue-950 text-white flex justify-center px-4 h-16 items-center">
      <p className="text-center">
        Copyright &copy;{currentyear} All rights are reserved
      </p>
    </footer>
  );
};

export default footer;
