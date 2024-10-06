"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const GetNotes = () => {
  const [notes, setNotes] = useState(null);
  // Extract the code (last part of the URL path) from window.location.pathname
  const codeId = window.location.pathname.split("/").pop();

  useEffect(() => {
    if (codeId) {
      getNotes(codeId);
    }
  }, [codeId]);

  const getNotes = async (code) => {
    try {
      const response = await axios.get(
        `https://sharenotes-nu.vercel.app/${code}`
      );
      console.log(response.data);
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Get Notes</h1>

      {notes ? (
        <div>
          <h2>{notes.title}</h2>
          <p>{notes.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetNotes;
