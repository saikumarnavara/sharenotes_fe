import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: { xs: 2, sm: 3 },
        textAlign: "center",
        borderTop: "1px solid #e0e0e0",
        marginTop: "auto",
      }}
    >
      <Typography variant="body2" color="textSecondary" gutterBottom>
        &copy; {currentYear} Growmore. All rights reserved.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Visit our website at{" "}
        <Link
          href="https://grow-more-psi.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          www.growmore.com
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
