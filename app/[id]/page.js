import React from "react";
import {
  Stack,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Link,
} from "@mui/material";
import CopyButton from "./CopyButton";
import Loader from "./Loader";
// This is a server component
const NotePage = async ({ params }) => {
  const { id } = params;
  let notes = null;
  let error = null;

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
          <Paper
            elevation={3}
            width="100%"
            sx={{
              backgroundColor: "black",
              padding: 2,
              width: "100%",
              overflow: "scroll",
            }}
          >
            <Typography
              component="pre"
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: "monospace",
                padding: 2,
                width: "100%",
                color: "white",
                overflow: "scroll",
              }}
            >
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 4,
        marginTop: 4,
      }}
    >
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
          <Grid item width="100%">
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
              }}
              width="100%"
            >
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                mb={2}
                wrap="nowrap"
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  pb: 2,
                  width: "100%",
                  overflowX: "auto",
                }}
              >
                <Grid item xs={12} md={6}>
                  <Link
                    href="/"
                    underline="none"
                    sx={{ textDecoration: "none" }}
                  >
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
                        cursor: "pointer",
                      }}
                    >
                      Share Notes
                    </Typography>
                  </Link>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      justifyContent: { xs: "flex-start", md: "flex-end" },
                      width: "100%",
                      overflowX: "auto", // Enables scrolling when content exceeds available width
                    }}
                  >
                    <CopyButton text={notes.msg} />

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

                    <Button variant="contained" color="primary">
                      Random
                    </Button>
                  </Stack>
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
    </Box>
  );
};

export default NotePage;
