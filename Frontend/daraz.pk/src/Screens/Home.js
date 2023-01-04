import { Container } from "@mui/material";
import Carousel from "../components/HomeScreen/Carousel";
import DarazMalls from "../components/HomeScreen/DarazMalls";
import Products from "../components/HomeScreen/Products";
import SaleItems from "../components/HomeScreen/SaleItems";
// import SearchBar from "./SearchBar";

function Home() {
  return (
    <>
      <Carousel />
      <Container style={{ marginTop: "1rem" }}>
        <SaleItems />
        <DarazMalls />
        <Products />
        {/* <SearchBar /> */}
      </Container>
    </>
  );
}

export default Home;
