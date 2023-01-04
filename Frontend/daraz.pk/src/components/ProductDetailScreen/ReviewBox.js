import {
  Box,
  Button,
  Divider,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Send, ThumbUpAlt, Verified } from "@mui/icons-material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ReviewBox({
  reviews = [],
  productId,
  description,
  ratings,
}) {
  const [comment, setComment] = useState("");
  const [reviewData, setReviewData] = useState(reviews);
  const user = useSelector((state) => state.user.user);
  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment,
        reviewer: user.name,
        rating: 4,
        isVerified: true,
      }),
    };
    fetch(
      `${process.env.REACT_APP_BASE_URL}products/setreviews/${productId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setReviewData(data.reviews);
        setComment("");
      })
      .catch((e) => console.log(e));
  }
  return (
    <Box
      lg={4}
      sx={{
        margin: "20px 0",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ backgroundColor: "#ECEFF1", px: 2, py: 1 }}>
        <Typography
          fontWeight={"bold"}
          width={"90%"}
          height={28}
          className="title--wFj93"
        >
          {description}..
        </Typography>{" "}
      </Box>
      <Box display={"flex"} flexWrap={"wrap"}>
        <Box sx={{ p: 8, backgroundColor: "white", flex: "0.3" }}>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: "400", fontSize: "3.5rem" }}>
              {ratings}.0
            </Typography>
            <Typography
              sx={{ fontWeight: "400", fontSize: "2rem", color: "gray" }}
            >
              \5.0
            </Typography>
          </Box>
          <Rating
            name="simple-controlled"
            readOnly
            value={ratings}
            sx={{ fontSize: "25px" }}
          />
          <Typography variant={"subtitle1"} color={"gray"}>
            {ratings} ratings
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Box display={"flex"} flexDirection={"column"} flex={"0.7"} p={8}>
          {new Array(5).fill("").map((a, i) => {
            return (
              <Rating
                key={i}
                name="simple-controlled"
                readOnly
                value={ratings - i}
                sx={{ fontSize: "20px", m: 0.5 }}
              />
            );
          })}
        </Box>
      </Box>
      <Divider />
      <Typography variant="h6" m={2}>
        Product Reviews
      </Typography>
      {reviewData.map((review) => {
        return (
          <Box key={review._id}>
            <Divider variant="fullWidth" />
            <Box sx={{ p: 2 }}>
              <Rating
                name="simple-controlled"
                readOnly
                value={review.rating}
                sx={{ fontSize: "22px" }}
              />
              <Box display={"flex"}>
                <Typography mx={1} color={"gray"} variant="caption">
                  by {review.reviewer}
                </Typography>
                {review.isVerified && (
                  <>
                    <Verified
                      fontSize="small"
                      color="success"
                      sx={{ position: "relative", bottom: 2, right: 1 }}
                    />
                    <Typography variant="caption" color={"green"} mx={0.5}>
                      Verified Purchase
                    </Typography>
                  </>
                )}
              </Box>
              <Typography my={1}>{review.comment}</Typography>
              <ThumbUpAlt fontSize="small" color="disabled" />
            </Box>
          </Box>
        );
      })}
      {user && (
        <form method="POST" action="/" onSubmit={handleSubmit}>
          <Box display={"flex"} my={1}>
            <TextField
              fullWidth
              label="Add a review about the product..."
              id="fullWidth"
              value={comment}
              onInput={(e) => setComment(e.target.value)}
              sx={{ flex: 0.95 }}
              required
              my={2}
            />
            <Button
              variant="text"
              type="submit"
              endIcon={<Send color="warning" />}
              sx={{ flex: 0.05 }}
            ></Button>
          </Box>
        </form>
      )}
    </Box>
  );
}
