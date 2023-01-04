import {
  AddBoxOutlined,
  Delete,
  IndeterminateCheckBoxOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
let discount = (originalPrice, discountedPrice) => {
  return Math.floor(((originalPrice - discountedPrice) / originalPrice) * 100);
};
export default function CartItemCard({
  item,
  qty,
  deleteItem,
  deleteButton,
  pid,
}) {
  const user = useSelector((state) => state);
  const [quantity, setQuantity] = useState(qty);
  const [disableCart, setDisableCart] = useState(false);

  function updateCart(increment) {
    setDisableCart(true);
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authToken: user.authToken.token,
      },
      body: JSON.stringify({
        userId: user.user.user.id,
        productId: item._id,
        increment,
      }),
    };
    fetch(`${process.env.REACT_APP_BASE_URL}cart/updatecart`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setQuantity(data.quantity);
        setDisableCart(false);
      })
      .catch((e) => console.log(e));
  }
  return (
    <Box
      sx={{
        p: 1,
        mr: 2,
        mb: 2,
        backgroundColor: "white",
        minWidth: "500px",
      }}
    >
      <Typography variant="button" mx={2}>
        {item.seller}
      </Typography>
      <Divider sx={{ my: 1.5 }} />
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box flex={0.1}>
          <img
            src={item.images[0]}
            height="100px"
            width="100px"
            alt="img"
          ></img>
        </Box>
        <Box flex={0.4}>
          <Typography
            width={"90%"}
            height={"30%"}
            overflow={"hidden"}
            variant="body2"
          >
            {item.description}
          </Typography>
          <Typography variant="caption" color="gray">
            Brand | {item.brand}
          </Typography>
        </Box>
        <Box flex={0.2} flexDirection="column">
          <Typography variant="subtitle1" color="orangered">
            Rs. {item.discountedPrice ? item.discountedPrice : item.price}
          </Typography>
          {item.discountedPrice && (
            <>
              <Typography
                sx={{ textDecoration: "line-through", color: "gray" }}
                variant="caption"
              >
                Rs. {item.price}
              </Typography>
              <Typography variant="body2">
                -{discount(item.price, item.discountedPrice)}%
              </Typography>
              <IconButton
                disabled={deleteButton}
                aria-label="delete"
                onClick={deleteItem}
              >
                <Delete />
              </IconButton>
            </>
          )}
        </Box>
        <Box flex={0.3}>
          <Box sx={{ mx: 3, display: "flex" }}>
            <IconButton
              size="medium"
              disabled={disableCart || quantity <= 1}
              edge="end"
              aria-haspopup="true"
              sx={{ color: "grey", flex: 4, alignSelf: "center" }}
              onClick={() => {
                updateCart(false);
              }}
            >
              <IndeterminateCheckBoxOutlined />
            </IconButton>
            <Typography
              variant="subtitle1"
              sx={{ flex: 2, alignSelf: "center" }}
              ml={2}
            >
              {quantity}
            </Typography>
            <IconButton
              size="medium"
              disabled={disableCart}
              edge="end"
              aria-haspopup="true"
              sx={{ color: "grey", flex: 4, alignSelf: "center" }}
              onClick={() => {
                updateCart(true);
              }}
            >
              <AddBoxOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
