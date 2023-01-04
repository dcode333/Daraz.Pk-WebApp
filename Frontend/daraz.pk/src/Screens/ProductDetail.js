import { Container, Grid, Skeleton, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ImageBox from "../components/ProductDetailScreen/ImageBox";
import DescBox from "../components/ProductDetailScreen/DescBox";
import Details from "../components/ProductDetailScreen/Details";
import ReviewBox from "../components/ProductDetailScreen/ReviewBox";


 
const ProductDetail = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [product, setProduct] = useState(null);
  let { id } = useParams();


  const quantitySetter = (quantity) => setQuantity(quantity);
  const colorSetter = (color) => setColor(color);
  const sizeSetter = (size) => setSize(size);
  const fetchData = async () => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_BASE_URL}products/getproduct/${id}`,
        {
          method: "GET",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        const product = await res.json();
        // console.log(product.product);
        setProduct(product.product);
      }
    } catch (e) {
      console.log(`Error in  : ${"Product Detail"}`, e);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!product)
    return (
      <Box sx={{ width: "90%", m: "0 auto" }}>
        <Skeleton variant={"h1"} animation="wave" sx={{ m: 5 }} />
        <Skeleton variant={"h1"} animation="wave" sx={{ m: 5 }} />
        <Skeleton variant={"h1"} animation="wave" sx={{ m: 5 }} />
        <Skeleton variant={"h1"} animation="wave" sx={{ m: 5 }} />
      </Box>
    );

  return (
    <Container>
      <Grid
        container
        sx={{
          margin: "0 auto",
          backgroundColor: "white",
        }}
      >
        <ImageBox imgUrl={product?.images} />
        <DescBox
          color={color}
          quantity={quantity}
          size={size}
          quantitySetter={quantitySetter}
          colorSetter={colorSetter}
          sizeSetter={sizeSetter}
          item={product}
        />
        <Details />
      </Grid>
      <ReviewBox
        productId={product._id}
        reviews={product.reviews}
        description={product.description}
        ratings={product.ratings}
      />
    </Container>
  );
};

export default ProductDetail;
