import { Box, CardMedia, Container } from "@mui/material";
import React from "react";
const ImageBox = ({
  imgUrl = ["https://mobiler.pk/wp-content/uploads/2021/04/Oppo-A54-.png"],
}) => {
  let [imgs, setImgs] = React.useState(imgUrl[0]);
  return (
    <Box
      lg={4}
      sx={{
        width: "52vh",
        m: "0 auto",
      }}
    >
      <Box>
        <CardMedia
          component="img"
          image={imgs}
          sx={{ height: "100%", width: "100%", mb: 5 }}
          alt="img"
        />
      </Box>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          overflow: "hidden",
          justifyContent: "space-between",
          my: 2,
        }}
      >
        {imgUrl.map((img, i) => (
          <CardMedia
            onClick={() => setImgs(img)}
            key={i}
            component="img"
            image={img}
            sx={{ height: 50, width: 50, borderRadius: 1, m: "auto" }}
            alt="img"
          />
        ))}
      </Container>
    </Box>
  );
};

export default ImageBox;
