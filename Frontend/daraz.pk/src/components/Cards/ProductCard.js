import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Rating,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { setUser } from "../../Redux_Store/Slices/userSlice";

let discount = (originalPrice, discountedPrice) => {
  return Math.floor(((originalPrice - discountedPrice) / originalPrice) * 100);
};

function ProductCard(props) {
  // const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    price,
    discountedPrice,
    ratings,
    reviews,
    image,
    shippingPrice,
    description,
    id,
  } = props;
  return (
    <Grid
      xs={12}
      sm={4}
      lg={2}
      sx={{ display: "inline-block", m: "1vh" }}
      item={true}
      onClick={() => navigate(`/product/${id}`)}
    >
      <Card sx={{ width: 200 }}>
        <CardActionArea>
          <CardMedia component="img" image={image} alt="img" />
          <CardContent>
            <Typography
              className="title--wFj93"
              sx={{ fontWeight: 500, fontSize: "11px", color: "#108ee9" }}
            >
              {description}
            </Typography>
            <Typography className="price--NVB62">
              Rs. {discountedPrice ? discountedPrice : price}
            </Typography>
            {!shippingPrice ? (
              <CardMedia
                sx={{ width: "25.7143px", height: "16px", margin: "5px 0" }}
                component="img"
                image={
                  "https://laz-img-cdn.alicdn.com/tfs/TB1QTkMXG67gK0jSZFHXXa9jVXa-45-28.png"
                }
                alt="img"
              />
            ) : null}
            {discountedPrice ? (
              <>
                <Typography
                  className="priceExtra--ocAYk"
                  sx={{
                    textDecoration: "line-through",
                    marginRight: "5px",
                    display: "inline-block",
                    fontSize: "10px",
                  }}
                >
                  Rs. {price}
                </Typography>
                <Typography
                  className="priceExtra--ocAYk"
                  sx={{ fontSize: "10px", display: "inline-block" }}
                >
                  -{discount(price, discountedPrice)}%
                </Typography>
                <br />
              </>
            ) : null}

            <Rating
              name="simple-controlled"
              readOnly
              value={ratings}
              sx={{ fontSize: "12px" }}
            />
            <Typography
              className="priceExtra--ocAYk"
              sx={{
                display: "inline-block",
                fontSize: "10px",
                position: "relative",
                bottom: "2px",
                left: "2px",
              }}
            >
              ({reviews.length})
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default ProductCard;
