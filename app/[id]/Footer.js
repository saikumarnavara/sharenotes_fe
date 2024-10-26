"use client";
import React, { useState } from "react";
import { Box, Typography, Link, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Typography variant="body1" color="textSecondary" gutterBottom>
        <Link
          component="button"
          onClick={handleOpen}
          sx={{
            cursor: "pointer",
            color: "primary.main",
            textDecoration: "underline",
          }}
        >
          Why Share-Notes?
        </Link>
      </Typography>
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

      {/* Modal for "Why Share-Notes?" */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="why-share-notes-modal"
      >
        <Box
          sx={{
            maxWidth: 500,
            width: "90%",
            margin: "auto",
            mt: 5,
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 1,
            position: "relative",
            boxShadow: 24,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Why Use Share-Notes?
          </Typography>
          <Box component="div" sx={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
            <p>
              <strong>Share-Notes</strong> is a secure, efficient platform for
              sharing information in real-time. Here’s why it’s the preferred
              choice:
            </p>
            <ul>
              <li>
                <strong>Comprehensive Content Support:</strong> Easily share
                notes, images, HTML, and code snippets with proper formatting to
                suit varied needs.
              </li>
              <li>
                <strong>Cross-Platform Sharing:</strong> Seamlessly share
                content directly to WhatsApp, Facebook, and X, reaching users
                across multiple platforms.
              </li>
              <li>
                <strong>Time-Limited Access:</strong> Links are active for 12
                hours, after which all shared data is automatically erased,
                ensuring time-bound privacy.
              </li>
              <li>
                <strong>Secure & Private:</strong> Built with privacy as a
                priority, Share-Notes ensures sensitive data is safeguarded,
                making it ideal for confidential sharing.
              </li>
              <li>
                <strong>Optimized for All Devices:</strong> Responsive design
                for easy use across mobile, tablet, and desktop devices.
              </li>
              <li>
                <strong>Developer-Friendly Code Sharing:</strong> Share code
                with indentation and syntax highlighting for a professional
                sharing experience, perfect for developers.
              </li>
            </ul>
            <p>
              Choose Share-Notes for a secure, flexible, and streamlined sharing
              experience.
            </p>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ mt: 2, display: "block", textAlign: "center" }}
            >
              &copy; {currentYear} Created by Growmore. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Footer;
