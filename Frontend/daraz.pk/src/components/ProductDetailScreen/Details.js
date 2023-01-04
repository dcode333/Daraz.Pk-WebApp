import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";
import {
  LocationOnOutlined,
  LocalShippingOutlined,
  PaymentsOutlined,
  Filter7Outlined,
  HideSourceOutlined,
} from "@mui/icons-material";

const details = ({ seller = "Byerz Hub" }) => {
  return (
    <Container
      lg={4}
      sx={{
        bgcolor: "#eff0f5",
        width: "40vh",
        margin: "0 auto",
      }}
    >
      <Box sx={{ my: 2, alignSelf: "flex-start" }}>
        <Typography variant="caption">Delivery</Typography>
        <Box>
          <Typography sx={{ display: "inline-block", fontSize: 14 }}>
            <LocationOnOutlined
              style={{
                fontSize: 20,
                position: "relative",
                top: 3,
                marginRight: 10,
              }}
            />
            Sindh, Karachi - Gulshan-e-Iqbal, Block 15
          </Typography>
        </Box>
        <Divider sx={{ margin: "0 auto", my: 2 }} />
        <Box style={{ display: "flex" }}>
          <Typography
            sx={{
              display: "inline-block",
              fontSize: 14,
              justifySelf: "flex-start",
            }}
          >
            <LocalShippingOutlined
              style={{
                fontSize: 20,
                position: "relative",
                top: 3,
                marginRight: 10,
              }}
            />
            Standard Delivery
          </Typography>
          <Typography variant="subtitle2" marginLeft={"auto"}>
            Rs.99
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              display: "inline-block",
              fontSize: 14,
            }}
          >
            <PaymentsOutlined
              style={{
                fontSize: 20,
                position: "relative",
                top: 3,
                marginRight: 10,
              }}
            />
            Cash on Delivery Available
          </Typography>
        </Box>
        <Divider sx={{ margin: "0 auto", my: 2 }} />
        <Typography variant="caption">Service</Typography>
        <Box>
          <Typography
            sx={{
              fontSize: 14,
            }}
          >
            <Filter7Outlined
              style={{
                fontSize: 20,
                position: "relative",
                top: 3,
                marginRight: 10,
              }}
            />
            7 Days Returns
          </Typography>
          <Typography variant="caption">Change is not acceptable</Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              display: "inline-block",
              fontSize: 14,
            }}
          >
            <HideSourceOutlined
              style={{
                fontSize: 20,
                position: "relative",
                top: 3,
                marginRight: 10,
              }}
            />
            Warranty not available
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ margin: "0 auto", my: 2 }} />

      <Box sx={{ my: 8, alignSelf: "flex-end" }}>
        <Typography variant="caption">Sold By: </Typography>
        <Typography variant="body1">{seller}</Typography>
        <Box sx={{ my: 2, display: "flex" }}>
          <Box
            sx={{
              width: "5rem",
              height: "5rem",
            }}
          >
            <Typography fontSize={".6rem"}>Positive Seller Ratings</Typography>
            <Typography fontSize={"1.5rem"}>90%</Typography>
          </Box>
          <Box
            sx={{
              width: "5rem",
              height: "5rem",
            }}
          >
            <Typography fontSize={".6rem"}>Ship on Time rate</Typography>
            <Typography fontSize={"1.5rem"}>90%</Typography>
          </Box>
          <Box
            sx={{
              width: "5rem",
              height: "5rem",
            }}
          >
            <Typography fontSize={".6rem"}>Chat Response rate</Typography>
            <Typography fontSize={"1.5rem"}>80%</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default details;
