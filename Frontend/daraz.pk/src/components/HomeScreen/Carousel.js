import { Carousel as Slider } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const links = [
  {
    url: "https://icms-image.slatic.net/images/ims-web/ff889b07-e749-42b1-bde8-0297ceaea857.jpg",
    to: "",
  },
  {
    url: "https://icms-image.slatic.net/images/ims-web/e50b7c2b-341e-417b-97a8-1ad05038f3dd.jpg",
    to: "",
  },
  {
    url: "https://icms-image.slatic.net/images/ims-web/f0f2ca99-b347-4e5b-afd7-36724a538e0a.jpg",
    to: "",
  },
  {
    url: "https://icms-image.slatic.net/images/ims-web/b995a10a-1403-4013-bd71-525f556f979d.jpg",
    to: "",
  },
];
export default function Carousel() {
  return (
    <Slider
      // showArrows={true}
      autoPlay
      interval="5000"
      showThumbs={false}
      transitionTime="2500"
      infiniteLoop
    >
      {links.map((link, i) => {
        return (
          <div key={i}>
            <img src={link.url} alt="img" />
          </div>
        );
      })}
    </Slider>
  );
}
