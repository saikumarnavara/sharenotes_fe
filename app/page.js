"use client";

import { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Modal,
  Typography,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";
import "quill/dist/quill.snow.css";
import Loader from "./[id]/Loader";
import NoteHead from "@/components/NoteHead";

// Load Quill dynamically
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

export default function Home() {
  const [activeTab, setActiveTab] = useState("shareNotes");
  const [note, setNote] = useState("");
  const [code, setCode] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [message, setMessage] = useState("");
  const [notesURL, setNotesURL] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const noteTitle = "Shared HTML Code";
  const noteDescription = `
    Here's a simple HTML snippet that you can copy:
    <pre>
      <code>
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <title>My Webpage</title>
          </head>
          <body>
            <h1>Hello, World!</h1>
            <p>This is a basic webpage template.</p>
          </body>
        </html>
      </code>
    </pre>
  `;
  const shareUrl = `https://share-notes-five.vercel.app`;

  const handleShare = async () => {
    if (!note && !code && !htmlContent) {
      setMessage("Please add content before sharing!");
      return;
    }
    let responseType;
    if (activeTab === "shareNotes") {
      responseType = "note";
    } else if (activeTab === "shareCode") {
      responseType = "code";
    } else if (activeTab === "shareHtml") {
      responseType = "html";
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://sharenotes-nu.vercel.app/createnote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            note:
              activeTab === "shareNotes"
                ? note
                : activeTab === "shareCode"
                ? code
                : htmlContent,
            response_type: responseType, // Adding response_type to the payload
          }),
        }
      );
      const data = await response.json();
      const fullURL = `${window.location.origin}/${data.note_id}`;
      setNotesURL(fullURL);

      if (response.ok) {
        setMessage("Content shared successfully!");
        setNote("");
        setCode("");
        setHtmlContent("");
        setIsModalOpen(true);
        setLoading(false);
      } else {
        setMessage("Failed to share the content.");
      }
    } catch (error) {
      setMessage("Error sharing the content.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(notesURL);
    setMessage("URL copied to clipboard!");
  };

  const handleOpen = () => {
    window.open(notesURL, "_blank");
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      // minHeight="100vh"
      padding={4}
    >
      <NoteHead
        title={`Shared Note: ${noteTitle}`}
        description="A shared HTML snippet that you can view and copy."
        url={shareUrl}
        image="https://your-app-url.com/note-thumbnail.png"
      />

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        SHARE NOTES, CODE, HTML
      </Typography>

      {/* Tab Navigation */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <Tab label="Share Notes" value="shareNotes" />
        <Tab label="Share Code" value="shareCode" />
        <Tab label="Share HTML" value="shareHtml" />
      </Tabs>

      {/* Content for each tab */}
      <Box mt={4} width={{ xs: "100%", sm: "75%", lg: "60%" }}>
        {activeTab === "shareNotes" && (
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            placeholder="Write your note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        )}

        {activeTab === "shareCode" && (
          <Box mt={2} style={{ height: "200px" }}>
            <MonacoEditor
              height="100%"
              language="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                selectOnLineNumbers: true,
                automaticLayout: true,
              }}
            />
          </Box>
        )}

        {activeTab === "shareHtml" && (
          <Box mt={2}>
            <QuillNoSSRWrapper
              theme="snow"
              value={htmlContent}
              onChange={setHtmlContent}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
              placeholder="Write your HTML content here..."
            />
          </Box>
        )}
      </Box>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleShare}>
          Share Content
        </Button>
      </Box>

      {message && (
        <Typography mt={2} color="error" align="center">
          {message}
        </Typography>
      )}

      {/* Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            outline: "none", // Ensure no border on focus
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Content Shared Successfully!
          </Typography>
          <Typography gutterBottom>Your content URL:</Typography>
          <Typography
            gutterBottom
            color="primary"
            style={{ wordWrap: "break-word" }}
          >
            {notesURL}
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="secondary" onClick={handleCopy}>
              Copy URL
            </Button>
            <Button variant="contained" color="success" onClick={handleOpen}>
              Open in New Tab
            </Button>
          </Box>
          <Button
            variant="contained"
            color="error"
            onClick={() => setIsModalOpen(false)}
            fullWidth
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
      {loading && <Loader />}
    </Box>
  );
}