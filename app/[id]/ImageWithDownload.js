"use client";

import React from "react";
import { Box, Button } from "@mui/material";

const ImageWithDownloadButton = ({ notes }) => {
  return (
    <Box
      component="div"
      sx={{
        "& img": {
          maxWidth: "100%",
          height: "auto",
        },
        textAlign: "center", // Center the image and button
        mt: 4,
      }}
    >
      {/* Display the image */}
      <img src={notes.msg} alt="Note Image" />

      {/* Download button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => {
          const link = document.createElement("a");
          link.href = notes.msg; // Use the base64 image string as the href
          link.download = "downloaded-image.jpg"; // Set a default filename
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      >
        Download Image
      </Button>
    </Box>
  );
};

export default ImageWithDownloadButton;
