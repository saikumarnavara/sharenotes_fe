"use client";
import React from "react";
import { AppBar, Toolbar, useMediaQuery, useTheme, Box } from "@mui/material";
import SparklesText from "@/components/ui/sparkles-text";
import Meteors from "@/components/ui/meteors";
import sharenotes_logo from "../sharenotes_logo.png";
import Image from "next/image";

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
        }}
      >
        <Meteors number={20} />
      </Box>
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "center",
          }}
        >
          <Image
            src={sharenotes_logo}
            alt="Share-Notes-logo"
            width={isMobile ? 30 : 50}
            style={{
              marginRight: "8px",
              backgroundColor: "#fff",
              padding: "5px",
              borderRadius: "5px",
              marginTop: isMobile ? "12px" : "",
            }}
          />
          <SparklesText
            text="Share-Notes"
            fontSize={isMobile ? "38px" : "h6"}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
