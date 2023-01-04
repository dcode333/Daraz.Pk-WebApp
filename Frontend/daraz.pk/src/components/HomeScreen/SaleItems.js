import {
  Box,
  Container,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SaleCard from "../Cards/SaleCard";

export default function SaleItems() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [product, setProduct] = useState(null);

  const fetchData = async () => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_BASE_URL}products/getsaleproducts`,
        {
          method: "GET",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        const product = await res.json();
        setProduct(product);
      }
    } catch (e) {
      console.log(`Error in  : ${"Product Detail"}`, e);
    }
  };

  const calculateTimeLeft = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const saleEnd = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      8,
      0,
      0
    );
    const timeLeftInMilliseconds = saleEnd.getTime() - date.getTime();

    let hoursLeft = Math.floor(
      (timeLeftInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutesLeft = Math.floor(
      (timeLeftInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    let secondsLeft = Math.floor((timeLeftInMilliseconds % (1000 * 60)) / 1000);

    // Adjust the time if seconds becomes negative
    if (seconds > secondsLeft) {
      secondsLeft += 60;
      minutesLeft--;
    }

    // Adjust the time if minutes becomes negative
    if (minutes > minutesLeft) {
      minutesLeft += 60;
      hoursLeft--;
    }

    // Adjust the time if hours becomes negative
    if (hours > hoursLeft) {
      hoursLeft += 24;
    }

    setTimeLeft([hoursLeft, minutesLeft, secondsLeft]);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (!product)
    return (
      <Box sx={{ width: "90%", m: "0 auto" }}>
        <Skeleton animation="wave" sx={{ m: 1 }} />
        <Skeleton animation="wave" sx={{ m: 1 }} />
        <Skeleton animation="wave" sx={{ m: 1 }} />
      </Box>
    );

  return (
    <>
      <Typography variant="h5" sx={{ color: "gray", my: 1 }}>
        Flash Sale
      </Typography>
      <Container sx={{ p: 2, backgroundColor: " #ffffff", mb: 5 }}>
        <Box sx={{ display: "flex", m: 2 }}>
          <Typography variant="subtitle2" mx={2} flex={0.2} color="orangered">
            On Sale now
          </Typography>
          <Box flex={0.8} display={"flex"}>
            <Typography variant="subtitle1" mx={2}>
              Ending in
            </Typography>
            {timeLeft?.map((timeLeft, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    width: 35,
                    height: 35,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "orangered",
                    position: "relative",
                    bottom: 5,
                    mx: 1,
                  }}
                >
                  <Typography color={"white"} variant={"subtitle1"}>
                    {timeLeft}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Divider />
        <Grid className="gridContainer" sx={{ backgroundColor: "#ffffff" }}>
          {product?.map((item, i) => {
            return (
              <SaleCard
                key={i}
                id={item._id}
                price={item.price}
                discountedPrice={item.discountedPrice}
                image={item.images[0]}
                description={item.description}
              />
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
