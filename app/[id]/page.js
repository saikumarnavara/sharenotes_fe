"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegCopy } from "react-icons/fa";

const NotePage = ({ params }) => {
  const { id } = params;
  const [notes, setNotes] = useState(null);

  const getNotes = async (code) => {
    try {
      const response = await axios.get(
        `https://sharenotes-nu.vercel.app/${code}`
      );
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  useEffect(() => {
    getNotes(id);
  }, [id]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Modal */}
      {notes && (
        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
          {/* Modal Content */}
          <h2 className="text-xl font-semibold mb-4">Note</h2>
          <p className="text-gray-700 mb-4">{notes.msg}</p>

          {/* Copy to Clipboard Section */}
          <div className="flex justify-end items-center">
            <button
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => copyToClipboard(notes.msg)}
            >
              <FaRegCopy className="mr-2" /> Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotePage;
