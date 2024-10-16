import React from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Link,
} from "@mui/material";
import CopyButton from "./CopyButton";
import Loader from "./Loader";
import NoteHead from "../../components/NoteHead";

// This is a server component
const NotePage = async ({ params }) => {
  const { id } = params;
  let notes = null;
  let error = null;
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
  const shareUrl = `https://share-notes-five.vercel.app/${id}`;

  try {
    const response = await fetch(`https://sharenotes-nu.vercel.app/${id}`, {
      cache: "no-store",
    });

    // Check if the response is OK (status 200–299)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Note not found.");
      } else {
        throw new Error("An error occurred while fetching the note.");
      }
    }

    // Parse the response data
    notes = await response.json();
  } catch (err) {
    // Catch any errors and set the error message
    error = err.message || "Something went wrong.";
    console.error("Error fetching note:", error);
  }

  // Function to render content based on the response type
  const renderContent = () => {
    switch (notes.response_type) {
      case "note":
        return (
          <Typography variant="body1" gutterBottom>
            {notes.msg}
          </Typography>
        );
      case "code":
        return (
          <Paper elevation={3} sx={{ backgroundColor: "#f5f5f5", padding: 2 }}>
            <Typography component="pre" variant="body2" gutterBottom>
              {notes.msg}
            </Typography>
          </Paper>
        );
      case "html":
        return (
          <Box
            component="div"
            sx={{
              "& h1, h2, h3, p": {
                marginBottom: "16px",
              },
            }}
            dangerouslySetInnerHTML={{ __html: notes.msg }}
          />
        );
      default:
        return (
          <Typography variant="body1" color="textSecondary">
            Unknown content type.
          </Typography>
        );
    }
  };

  return (
    <Container
      maxWidth="false"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 4,
        marginTop: 4,
      }}
    >
      <NoteHead
        title={`Shared Note: ${noteTitle}`}
        description="A shared HTML snippet that you can view and copy."
        url={shareUrl}
        image="https://your-app-url.com/note-thumbnail.png"
      />

      <Grid container justifyContent="center">
        {error ? (
          // Display a user-friendly error message
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom color="error">
                Error
              </Typography>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Paper>
          </Grid>
        ) : notes ? (
          // Display the note if available
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                mb={2}
                wrap="nowrap"
                sx={{ borderBottom: "1px solid #e0e0e0", pb: 2 }}
              >
                <Grid item>
                  <Typography
                    gutterBottom
                    sx={{
                      backgroundColor: "#ffe082",
                      color: "#000",
                      padding: "8px 8px",
                      borderRadius: "8px",
                      display: "inline-block",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontSize: "1rem",
                    }}
                  >
                    Share Notes
                  </Typography>
                </Grid>

                <Grid item>
                  <CopyButton text={notes.msg} />
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to Notes
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Random
                  </Button>
                </Grid>
              </Grid>
              {/* Render content based on the response type */}
              {renderContent()}
            </Paper>
          </Grid>
        ) : (
          <Loader />
        )}
      </Grid>
    </Container>
  );
};

export default NotePage;
