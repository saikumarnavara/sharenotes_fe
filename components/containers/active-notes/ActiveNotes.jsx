"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";

const ActiveNotes = ({ refresh }) => {
  const [notesCount, setNotesCount] = useState(null);
  const [error, setError] = useState(null);

  const fetchNotesCount = async () => {
    try {
      const response = await fetch("https://sharenotes-nu.vercel.app");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setNotesCount(data.notes_count);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Could not load active notes count.");
    }
  };

  useEffect(() => {
    fetchNotesCount();
  }, [refresh]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bottom: 16,
        width: "100%",
        justifyContent: "center",
        bgcolor: "background.paper",
        padding: 1,
        boxShadow: 2,
        zIndex: 10,
      }}
    >
      <CircleIcon sx={{ color: "green", fontSize: "0.75rem", mr: 0.5 }} />
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.875rem",
          fontWeight: "bold",
          color: "text.secondary",
        }}
      >
        {error
          ? error
          : `Active Notes: ${notesCount !== null ? notesCount : "Loading..."}`}
      </Typography>
    </Box>
  );
};

export default ActiveNotes;
