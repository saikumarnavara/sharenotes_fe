import React from "react";
import { Stack, Paper, Typography, Grid, Button, Link } from "@mui/material";
import CopyButton from "./CopyButton";
import Loader from "./Loader";
import ImageWithDownloadButton from "./ImageWithDownload";
import Footer from "./Footer";
import Header from "./Header";
import { FireworksAnimations } from "./Fireworks";

// This is a server component
const NotePage = async ({ params }) => {
  const { id } = params;
  let notes = null;
  let error = null;

  try {
    const response = await fetch(`https://sharenotes-nu.vercel.app/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Note not found.");
      } else {
        throw new Error("An error occurred while fetching the note.");
      }
    }

    notes = await response.json();
  } catch (err) {
    error = err.message || "Something went wrong.";
    console.error("Error fetching note:", error);
  }

  // Function to render content based on the response type
  const renderContent = () => {
    switch (notes.response_type) {
      case "note":
        return (
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "black",
              padding: { xs: 1, sm: 2 },
              width: "100%",
            }}
          >
            <Typography
              component="pre"
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: "monospace",
                padding: { xs: 1, sm: 2 },
                color: "white",
                width: "100%",
                overflowX: "scroll",
              }}
            >
              {notes.msg}
            </Typography>
          </Paper>
        );
      case "code":
        return (
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "black",
              padding: { xs: 1, sm: 2 },
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
                padding: { xs: 1, sm: 2 },
                color: "white",
                overflowX: "scroll",
              }}
            >
              {notes.msg}
            </Typography>
          </Paper>
        );
      case "html":
        return (
          <div
            style={{
              "& h1, h2, h3, p": {
                marginBottom: "16px",
              },
            }}
            dangerouslySetInnerHTML={{ __html: notes.msg }}
          />
        );
      case "image":
        return <ImageWithDownloadButton notes={notes} />;
      default:
        return (
          <Typography variant="body1" color="textSecondary">
            Unknown content type.
          </Typography>
        );
    }
  };

  return (
    <Grid>
      {error ? (
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              textAlign: "center",
              marginBottom: "500px",
              marginTop: "50px",
            }}
          >
            <Typography variant="h6" gutterBottom color="error">
              Error
            </Typography>
            <Typography variant="body2" color="error">
              Unable to load notes. They may have expired or encountered an
              error.
            </Typography>
          </Paper>
        </Grid>
      ) : notes ? (
        <Grid item xs={12} sm={12} md={10} lg={8}>
          <Header />
          <FireworksAnimations />
          <Paper
            elevation={0}
            sx={{
              padding: { xs: 2, sm: 4 },
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "12px",
              width: "100%",
            }}
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
                <Link href="/" underline="none" sx={{ textDecoration: "none" }}>
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
                      fontSize: { xs: "0.85rem", sm: "1rem" },
                      cursor: "pointer",
                    }}
                  >
                    Share Notes
                  </Typography>
                </Link>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{
                    justifyContent: { xs: "flex-start", md: "flex-end" },
                    width: "100%",
                    overflowX: "auto",
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

                  {/* <Button variant="contained" color="primary">
                    Random
                  </Button> */}
                </Stack>
              </Grid>
            </Grid>

            {renderContent()}
          </Paper>
        </Grid>
      ) : (
        <Loader />
      )}
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default NotePage;
