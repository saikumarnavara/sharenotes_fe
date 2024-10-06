"use client";
import { useState } from "react";

export default function Home() {
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [notesURL, setNotesURL] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShare = async () => {
    if (!note) {
      setMessage("Please write a note before sharing!");
      return;
    }

    try {
      const response = await fetch(
        "https://sharenotes-nu.vercel.app/createnote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            note: note,
          }),
        }
      );
      const data = await response.json();
      // const fullURL = `http://localhost:3000/${data.note_id}`;
      const fullURL = `${window.location.origin}/${data.note_id}`;
      setNotesURL(fullURL);

      if (response.ok) {
        setMessage("Note shared successfully!");
        setNote("");
        setIsModalOpen(true);
      } else {
        setMessage("Failed to share the note.");
      }
    } catch (error) {
      setMessage("Error sharing the note.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(notesURL);
    setMessage("URL copied to clipboard!");
  };

  const handleOpen = () => {
    window.open(notesURL, "_blank");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold">SHARE NOTES</h1>

      <div className="w-full sm:w-3/4 lg:w-2/3 xl:w-1/2">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 resize-none"
          rows="6"
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>

      <button
        onClick={handleShare}
        className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all"
      >
        Share Note
      </button>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              Note Shared Successfully!
            </h2>
            <p className="mb-4">Your note URL:</p>
            <p className="mb-4 text-blue-500 underline">{notesURL}</p>
            <div className="flex gap-4">
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition-all"
              >
                Copy URL
              </button>
              <button
                onClick={handleOpen}
                className="px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-all"
              >
                Open in New Tab
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-6 py-3 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
