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
