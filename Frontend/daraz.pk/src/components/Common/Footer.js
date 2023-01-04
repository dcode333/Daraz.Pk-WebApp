import { Box, CardMedia, Container, Link, Typography } from "@mui/material";
import React from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" m={5}>
      {"Copyright © "}
      <Link color="inherit">Daraz.pk</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: "#ECEFF1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        width={"100%"}
        sx={{
          backgroundColor: "white",
        }}
      >
        <CardMedia
          component="img"
          image={"/footer.png"}
          alt="img"
          height={150}
          sx={{ objectFit: "contain", mt: 1 }}
        />
      </Box>
      <Copyright />
    </Box>
  );
}
