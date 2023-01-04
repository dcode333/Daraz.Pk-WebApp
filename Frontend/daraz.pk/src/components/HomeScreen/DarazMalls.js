import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import DarazMallCard from "../Cards/DarazMallCard";

let resources = [
  {
    coverImg:
      "https://static-01.daraz.pk/p/349ffb1161eb0225cf7e75810b99b3b5.jpg",
    profileImg:
      "https://static-01.daraz.pk/other/shop/37358809a3f3d0637836e4cf43284e83.jpeg",
    subTitle: "Shan",
  },
  {
    profileImg:
      "https://static-01.daraz.pk/other/shop/f63957e5fd059166b5658b7720097313.jpeg",
    coverImg:
      "https://static-01.daraz.pk/p/80e187a71b7769a482fb21b994f2f17d.jpg",
    subTitle: " Hontinga ",
  },
  {
    profileImg:
      "https://static-01.daraz.pk/other/shop/2e2a476465b0e6bf061ba2b6a4f235bf.png",
    coverImg:
      "https://static-01.daraz.pk/p/1c4981c205caaa68de874175bd67b10a.jpg",
    subTitle: "EISA WHOLSELLERS",
  },
  {
    profileImg:
      "https://static-01.daraz.pk/other/shop/67eb5f0fb1192554fcec47ffd8b3020b.png",
    coverImg:
      "https://static-01.daraz.pk/p/f13ef69a30761947ac75fabe45bda505.jpg",
    subTitle: "dFresh Islamabad",
  },
  {
    profileImg:
      "https://static-01.daraz.pk/other/shop/58a6a5e845138f1cc49f8f8bb87bedfb.png",
    coverImg:
      "https://static-01.daraz.pk/p/bb84a30a8903e128c156a118f4379711.jpg",
    subTitle: "DETTOL",
  },
];
export default function DarazMalls() {
  return (
    <>
      <Typography variant="h5" sx={{ color: "gray" }}>
        Daraz Mall
      </Typography>
      <Container>
        <Grid className="gridContainer">
          {resources.map(({ profileImg, coverImg, title, subTitle }, i) => {
            return (
              <DarazMallCard
                key={i}
                ProfileImg={profileImg}
                subTitle={subTitle}
                coverImg={coverImg}
                title={title}
              />
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
