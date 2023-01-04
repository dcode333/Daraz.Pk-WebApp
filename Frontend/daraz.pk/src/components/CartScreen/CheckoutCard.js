import React from "react";
import {
  Box,
  Button,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

export default function CheckoutCard({
  subTotal = 0,
  total = 0,
  shipping = 0,
  items = 0,
  setOpen,
}) {
  return (
    <>
      <Typography>Order Summary</Typography>
      <ListItem sx={{ px: 0 }}>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body2" style={{ color: "gray" }}>
              {`Subtotal (${items}) items`}
            </Typography>
          }
        />
        <Typography variant="subtitle1">{`Rs. ${subTotal}`}</Typography>
      </ListItem>
      <ListItem sx={{ px: 0 }}>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body2" style={{ color: "gray" }}>
              Shipping
            </Typography>
          }
        />
        <Typography variant="subtitle1">{`Rs. ${shipping}`}</Typography>
      </ListItem>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
        <TextField
          id="outlined-basic"
          label="Enter voucher code.."
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            setOpen(true);
          }}
        >
          Apply
        </Button>
      </Box>
      <ListItem sx={{ px: 0 }}>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body2" style={{ color: "gray" }}>
              Total
            </Typography>
          }
        />
        <Typography
          color={"orangered"}
          variant="subtitle1"
        >{`Rs. ${total}`}</Typography>
      </ListItem>
      <Box justifySelf={"center"}>
        <Button
          variant="contained"
          size="medium"
          sx={{ m: "0 auto" }}
          style={{ backgroundColor: "orangered" }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </>
  );
}
