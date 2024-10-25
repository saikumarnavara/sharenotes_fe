import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1, textAlign: isMobile ? "center" : "center" }}>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            fontWeight="bold"
            gutterBottom
          >
            SHARE NOTES, IMAGE, CODE, HTML
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
