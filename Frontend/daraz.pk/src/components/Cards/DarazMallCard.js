import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

export default function DarazMallCard({
  coverImg = "https://static-01.daraz.pk/p/80e187a71b7769a482fb21b994f2f17d.jpg",
  ProfileImg = "https://static-01.daraz.pk/other/shop/37358809a3f3d0637836e4cf43284e83.jpeg",
  subTitle = "Shan",
}) {
  return (
    <Card>
      <CardMedia
        component="img"
        image={coverImg}
        alt="green iguana"
        sx={{ boxShadow: 4 }}
      />
      <CardContent>
        <CardMedia
          component="img"
          image={ProfileImg}
          alt="green iguana"
          sx={{
            height: "3rem",
            width: "3rem",
            position: "relative",
            // m: "0 auto",
            bottom: 50,
            border: "solid 5px white",
            boxShadow: 6,
          }}
        />
        <Box sx={{ /*textAlign: "center",*/ mt: -5 }}>
          <Typography variant="subtitle1">{subTitle}</Typography>
          <Typography variant="caption" color={"gray"}>
            {subTitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
