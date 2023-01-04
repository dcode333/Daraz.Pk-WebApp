import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
let discount = (originalPrice, discountedPrice) => {
  return Math.floor(((originalPrice - discountedPrice) / originalPrice) * 100);
};

function SaleCard(props) {
  const navigate = useNavigate();
  const { price, discountedPrice, image, description, id } = props;
  return (
    <Grid
      sx={{ display: "inline-block" }}
      item={true}
      onClick={() => navigate(`/product/${id}`)}
    >
      <Card sx={{ width: 200 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={image}
            alt="img"
            height={150}
            sx={{ objectFit: "contain", mt: 1 }}
          />
          <CardContent>
            <Typography
              className="title--wFj93"
              sx={{ fontWeight: 500, fontSize: "11px", color: "black" }}
            >
              {description}
            </Typography>
            <Typography className="price--NVB62">
              Rs. {discountedPrice ? discountedPrice : price}
            </Typography>
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
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default SaleCard;
