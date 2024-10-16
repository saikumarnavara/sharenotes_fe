"use client";

import React from "react";
import { FaRegCopy } from "react-icons/fa";

const CopyButton = ({ text }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <button
      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
      onClick={copyToClipboard}
    >
      <FaRegCopy className="mr-2" /> Copy
    </button>
  );
};

export default CopyButton;
