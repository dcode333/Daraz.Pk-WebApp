import { Routes, Route } from "react-router-dom";
import Home from "../Screens/Home";
import LoginScreen from "../Screens/Login";
import ProductDetailScreen from "../Screens/ProductDetail";
import RegisterScreen from "../Screens/Register";
import CartScreen from "../Screens/Cart";
import ProtectedRoute from "./Protected";
import NotFound from "../Screens/NotFound";
import Checkout from "../Screens/Checkout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetailScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartScreen />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
