import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../Cards/ProductCard";

 
export default function Products() {
  const [items, setItems] = React.useState([]);

  const fetchMoreData = async () => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_BASE_URL}products/getproducts/${
          items.length + 4
        }`,
        {
          method: "GET",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        const products = await res.json();
        setItems(products);
      }
    } catch (e) {
      console.log("Umair err is", e);
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  if (items === [])
    return (
      <Box sx={{ width: "90%", m: "0 auto" }}>
        <Skeleton animation="wave" sx={{ m: 1 }} />
        <Skeleton animation="wave" sx={{ m: 1 }} />
        <Skeleton animation="wave" sx={{ m: 1 }} />
      </Box>
    );
  return (
    <>
      <Typography variant="h5" sx={{ color: "gray", mt: 5 }}>
        Just For You
      </Typography>
      <Container>
        <Grid className="gridContainer">
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={true}
            // loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
            // endMessage={
            //   <h4 style={{ textAlign: "center" }}>No More Products</h4>
            // }
          >
            {items.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                price={item.price}
                discountedPrice={item.discountedPrice}
                ratings={item.ratings}
                reviews={item.reviews}
                image={item.images[0]}
                shippingPrice={item.shippingPrice}
                description={item.description}
              />
            ))}
          </InfiniteScroll>
        </Grid>
      </Container>
    </>
  );
}
