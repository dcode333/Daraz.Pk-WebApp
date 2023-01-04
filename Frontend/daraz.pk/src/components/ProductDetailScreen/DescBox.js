import {
  Box,
  IconButton,
  Rating,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import {
  FavoriteBorderOutlined,
  Share,
  Circle,
  IndeterminateCheckBoxOutlined,
  AddBoxOutlined,
  CheckCircle,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

let discount = (originalPrice, discountedPrice) => {
  return Math.floor(((originalPrice - discountedPrice) / originalPrice) * 100);
};

const DescBox = ({
  size,
  quantity,
  color,
  quantitySetter,
  colorSetter,
  sizeSetter,
  item,
}) => {
  const [selected, setSelected] = useState(null);
  const [disableButtons, setDisableButtons] = useState(false);
  const user = useSelector((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  function handleSubmit() {
    setDisableButtons(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: user.authToken.token,
      },
      body: JSON.stringify({
        userId: user.user.user.id,
        productId: item._id,
        quantity,
      }),
    };
    fetch(`${process.env.REACT_APP_BASE_URL}cart/add-to-cart`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        setDisableButtons(false);
      })
      .catch((e) => console.log(e));
  }
  return (
    <Box
      lg={4}
      sx={{
        width: "80vh",
        margin: "0 auto",
      }}
    >
      <Box>
        <Typography variant="body1">{item.description}</Typography>
      </Box>
      <Box>
        <Rating
          name="simple-controlled"
          readOnly
          value={item.ratings}
          sx={{ fontSize: "13px", mr: 1.5 }}
        />
        <Typography
          sx={{
            display: "inline-block",
            fontSize: "13px",
            color: "rgb(26, 156, 183)",
          }}
        >
          {item.reviews?.length} Ratings
        </Typography>
        <Box sx={{ display: "inline-block" }}>
          <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            sx={{ color: "grey" }}
          >
            <Share />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            sx={{ color: "grey" }}
          >
            <FavoriteBorderOutlined />
          </IconButton>
        </Box>
        <Typography
          sx={{
            fontSize: "13px",
            color: "gray",
          }}
        >
          Brand: {item.brand ? item.brand : "No Brand"}
        </Typography>
        <Divider sx={{ margin: "0 auto", my: 2 }} />
        <Box sx={{ ml: 3 }}>
          <Typography sx={{ fontSize: "25px", color: "#f57224" }}>
            Rs. {item.discountedPrice ? item.discountedPrice : item.price}
          </Typography>
          {item.discountedPrice ? (
            <>
              <Typography
                className="priceExtra--ocAYk"
                sx={{
                  textDecoration: "line-through",
                  mr: 1,
                  display: "inline-block",
                  fontSize: "13px",
                }}
              >
                Rs. {item.price}
              </Typography>
              <Typography
                className="priceExtra--ocAYk"
                sx={{ fontSize: "10px", display: "inline-block" }}
              >
                {discount(item.price, item.discountedPrice)}%
              </Typography>
              <br />
            </>
          ) : null}
          <Typography
            sx={{ fontSize: "13px", color: "gray", display: "inline-block" }}
          >
            colors:
          </Typography>
          {item.colors?.map((c, i) => (
            <IconButton
              size="medium"
              key={i}
              edge="end"
              aria-haspopup="true"
              sx={{ color: c }}
              onClick={() => {
                colorSetter(c);
                setSelected(c);
              }}
            >
              {selected === c ? <CheckCircle /> : <Circle />}
            </IconButton>
          ))}
        </Box>
        {item.sizes ? (
          <FormControl sx={{ m: 3 }}>
            <InputLabel id="demo-simple-select-label">Size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: "10rem" }}
              value={size}
              label="size"
              onChange={(e) => sizeSetter(e.target.value)}
            >
              {item.sizes?.map((s, i) => (
                <MenuItem key={i} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
        <Box sx={{ mx: 3 }}>
          <Typography
            sx={{ fontSize: "13px", color: "gray", display: "inline-block" }}
          >
            Quantity:
          </Typography>
          <IconButton
            size="large"
            edge="end"
            disabled={quantity > 1 ? false : true}
            aria-haspopup="true"
            sx={{ color: "grey" }}
            onClick={() => quantitySetter(quantity - 1)}
          >
            <IndeterminateCheckBoxOutlined />
          </IconButton>
          <Typography
            sx={{ fontSize: "18px", display: "inline-block", ml: 2, mr: 1 }}
            variant="subtitle1"
          >
            {quantity}
          </Typography>
          <IconButton
            size="large"
            edge="end"
            disabled={quantity < 5 ? false : true}
            aria-haspopup="true"
            sx={{ color: "grey" }}
            onClick={() => quantitySetter(quantity + 1)}
          >
            <AddBoxOutlined />
          </IconButton>
        </Box>
        <Box sx={{ m: 3 }}>
          <Button
            sx={{ bgcolor: "#2abbe8", mr: 2 }}
            size="large"
            variant="contained"
            disabled={disableButtons}
            onClick={() =>
              !user.authToken.token
                ? navigate("/login", { state: { path: location.pathname } })
                : navigate("/checkout")
            }
          >
            Buy Now
          </Button>
          <Button
            sx={{ bgcolor: "#f57224" }}
            size="large"
            variant="contained"
            disabled={disableButtons}
            onClick={() =>
              user.authToken.token
                ? handleSubmit()
                : navigate("/login", { state: { path: location.pathname } })
            }
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DescBox;
