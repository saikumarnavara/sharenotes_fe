"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import SparklesText from "@/components/ui/sparkles-text";
import Meteors from "@/components/ui/meteors";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#000",
        boxShadow: "none",
        padding: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
          // zIndex: -1,
        }}
      >
        <Meteors number={20} />
      </Box>
      <Toolbar>
        <Box sx={{ flexGrow: 1, textAlign: isMobile ? "center" : "center" }}>
          {/* <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            fontWeight="bold"
            gutterBottom
          > */}
          <SparklesText
            text="Share-Notes"
            fontSize={isMobile ? "38px" : "h6"}
          />
          {/* </Typography> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
