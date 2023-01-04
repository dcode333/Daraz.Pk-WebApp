import { Box, Typography } from "@mui/material";
import React from "react";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        my: 20,
      }}
    >
      <Typography>Page Not Found</Typography>
    </Box>
  );
}
