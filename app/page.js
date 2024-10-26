"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
// import MonacoEditor from "react-monaco-editor";
const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Modal,
  Typography,
  Tabs,
  Tab,
  TextField,
  useMediaQuery,
  Grid,
  Container,
} from "@mui/material";
import "quill/dist/quill.snow.css";
import Loader from "./[id]/Loader";
import { FileUploader } from "react-drag-drop-files";
import Footer from "./[id]/Footer";
import Header from "./[id]/Header";
import { FireworksAnimations } from "./[id]/Fireworks";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import ShimmerButton from "@/components/ui/shimmer-button";

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
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileTypes = ["JPG", "PNG", "GIF"];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleShare = async () => {
    if (!note && !code && !htmlContent && !image) {
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
    } else if (activeTab === "shareImage") {
      responseType = "image";
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
                : activeTab === "shareHtml"
                ? htmlContent
                : activeTab === "shareImage"
                ? image
                : "",
            response_type: responseType,
          }),
        }
      );
      if (response.status !== 200) {
        setMessage("Failed to share the content.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      // const fullURL = `${window.location.origin}/${data.note_id}`;
      // setNotesURL(fullURL);

      // Ensure this runs only in the browser
      if (typeof window !== "undefined") {
        const fullURL = `${window.location.origin}/${data.note_id}`;
        setNotesURL(fullURL);
      }

      if (response.ok) {
        setMessage("Content shared successfully!");
        setNote("");
        setCode("");
        setHtmlContent("");
        setIsModalOpen(true);
        setLoading(false);
        setImage(null);
        FireworksAnimations();
      } else {
        setMessage("Failed to share the content.");
      }
    } catch (error) {
      setMessage("Error sharing the content.", error);
      setLoading(false);
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
  const handlePasteCode = async () => {
    try {
      // Read clipboard content
      const text = await navigator.clipboard.readText();
      // Update the code state with the clipboard content
      setCode(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };
  const handleImageToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error converting image to base64:", error);
    };
  };
  const handleWhatsappShare = () => {
    const url = encodeURIComponent(notesURL);
    const whatsappUrl = `https://wa.me/?text=${url}`;
    window.open(whatsappUrl, "_blank");
  };

  // Function to handle Facebook sharing
  const handleFacebookShare = () => {
    const url = encodeURIComponent(notesURL);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, "_blank");
  };
  const handleTwitterShare = () => {
    const url = encodeURIComponent(notesURL);
    const text = encodeURIComponent("Check out this content!");
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        // minHeight="100vh"
        padding={isMobile ? 4 : 0}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          centered={!isMobile}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : "off"}
          classes={{ indicator: "tab-indicator" }} // Custom class for the indicator
        >
          <Tab
            label="Share Notes"
            value="shareNotes"
            classes={{ root: "custom-tab", selected: "custom-tab-selected" }} // Custom classes for tab styling
          />
          <Tab
            label="Share Image"
            value="shareImage"
            classes={{ root: "custom-tab", selected: "custom-tab-selected" }}
          />
          <Tab
            label="Share Code"
            value="shareCode"
            classes={{ root: "custom-tab", selected: "custom-tab-selected" }}
          />
          <Tab
            label="Share HTML"
            value="shareHtml"
            classes={{ root: "custom-tab", selected: "custom-tab-selected" }}
          />
        </Tabs>

        {/* Content for each tab */}
        <Box mt={4} width={{ xs: "100%", sm: "75%", lg: "60%" }}>
          {activeTab === "shareNotes" && (
            <TextField
              id="outlined-multiline-flexible"
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              placeholder="Write your note here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              InputProps={{
                style: {
                  fontWeight: "bold",
                  minHeight: "120px",
                },
                classes: {
                  notchedOutline: "custom-outline",
                },
              }}
            />
          )}

          {activeTab === "shareCode" && (
            <Box mt={2} style={{ height: "300px" }}>
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
                editorDidMount={(editor) => {
                  editor.focus();
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
        {activeTab === "shareImage" && (
          <Box mt={4}>
            <FileUploader
              handleChange={(file) => {
                setImage(file);
                handleImageToBase64(file);
              }}
              name="file"
              types={fileTypes}
              fileOrFiles={image}
              label="Upload or drag and drop an image"
              multiple={false}
              maxSize={10}
              onTypeError={(err) => alert(err)}
              onSizeError={(err) => alert(err)}
            />
          </Box>
        )}

        <Box mt={4}>
          {/* Only show when activeTab is "shareCode" */}
          {activeTab === "shareCode" && (
            <Grid
              container
              spacing={isMobile ? 2 : 3}
              justifyContent={isMobile ? "center" : "flex-start"}
              sx={{
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} sm="auto">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePasteCode}
                  fullWidth={isMobile}
                  sx={{
                    padding: { xs: "8px", sm: "12px 24px" },
                  }}
                >
                  Paste Code
                </Button>
              </Grid>
              <Grid item xs={12} sm="auto">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setCode("")}
                  fullWidth={isMobile}
                  sx={{
                    padding: { xs: "8px", sm: "12px 24px" },
                  }}
                >
                  Clear Code
                </Button>
              </Grid>
            </Grid>
          )}

          {/* Share content button */}
          <Grid
            container
            justifyContent={isMobile ? "center" : "center"}
            spacing={isMobile ? 2 : 3}
            sx={{
              mt: 2,
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} sm="auto">
              <ShimmerButton
                onClick={handleShare}
                fullWidth={isMobile}
                sx={{
                  padding: { xs: "8px", sm: "12px 24px" },
                }}
              >
                Share Content
              </ShimmerButton>
            </Grid>
          </Grid>
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
              width: { xs: "90%", sm: 400 },
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              outline: "none",
              width: isMobile ? "90%" : "auto",
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
            <Box
              display="flex"
              justifyContent="space-between"
              mt={2}
              flexWrap="wrap"
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCopy}
                sx={{ mb: { xs: 1, sm: 0 }, flexGrow: 1, mr: 1 }}
              >
                Copy URL
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleOpen}
                sx={{ mb: { xs: 1, sm: 0 }, flexGrow: 1, ml: 1 }}
              >
                Open
              </Button>
            </Box>

            <Box
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
              justifyContent={isMobile ? "center" : "space-around"}
              alignItems="center"
              mt={2}
              gap={1}
            >
              <Button
                variant="outlined"
                startIcon={<FaWhatsapp />}
                onClick={handleWhatsappShare}
                color="success"
                sx={{ width: isMobile ? "100%" : "auto" }}
              >
                WhatsApp
              </Button>
              <Button
                variant="outlined"
                startIcon={<FaFacebook />}
                onClick={handleFacebookShare}
                color="primary"
                sx={{ width: isMobile ? "100%" : "auto" }}
              >
                Facebook
              </Button>
              <Button
                variant="outlined"
                startIcon={<FaTwitter />}
                onClick={handleTwitterShare}
                color="info"
                sx={{ width: isMobile ? "100%" : "auto" }}
              >
                Twitter
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
        {loading ? <Loader /> : null}
      </Box>
      <Grid
        item
        xs={12}
        sx={{
          marginTop: isMobile ? "280px" : "100px",
        }}
      >
        <Footer />
      </Grid>
    </div>
  );
}
