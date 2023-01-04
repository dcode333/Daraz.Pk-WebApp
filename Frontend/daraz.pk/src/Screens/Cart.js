import { Alert, Box, Container, Skeleton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CartItemCard from "../components/CartScreen/CartItemCard";
import CheckoutCard from "../components/CartScreen/CheckoutCard";
import { useSelector } from "react-redux";

const subTotal = (items) =>
  items.reduce(
    (acc, item) =>
      acc +
      (item.productId.discountedPrice
        ? item.productId.discountedPrice
        : item.productId.price) *
        item.quantity,
    0
  );

const shipping = (len) => len * 120;

export default function Cart() {
  const [items, setItems] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  const user = useSelector((state) => state);

  const fetchCart = async () => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_BASE_URL}cart/getcart/${user.user.user.id}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            authToken: user.authToken.token,
          },
        }
      );
      if (res.ok) {
        const cart = await res.json();
        setItems(cart);
      }
    } catch (e) {
      console.log(`Error in  : ${"Cart"}`, e);
    }
  };

  const deleteCart = async (id) => {
    setDeleteButton(true);
    try {
      let res = await fetch(
        `${process.env.REACT_APP_BASE_URL}cart/deletecart/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            authToken: user.authToken.token,
          },
        }
      );
      if (res.ok) {
        const cart = await res.json();
        setTimeout(() => {
          setDeleteButton(false);
        }, 2000);
        fetchCart();
      }
    } catch (e) {
      console.log(`Error in  : ${"Cart"}`, e);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (!items)
    return (
      <Box sx={{ width: "90%", m: "0 auto" }}>
        <Skeleton animation="wave" sx={{ m: 1 }} />
        <Skeleton animation="wave" sx={{ m: 1 }} />
        <Skeleton animation="wave" sx={{ m: 1 }} />
      </Box>
    );
  return (
    <Container sx={{ display: "flex", flexWrap: "wrap", flexGrow: 1 }}>
      <Box sx={{ flex: 0.65, flexDirection: "column", mb: 3 }}>
        {items?.map((item, i) => {
          return (
            <CartItemCard
              key={item._id}
              item={item.productId}
              qty={item.quantity}
              deleteItem={() => {
                deleteCart(item._id);
              }}
              deleteButton={deleteButton} 
            />
          );
        })}
      </Box>
      <Box
        sx={{
          flex: 0.35,
          backgroundColor: "white",
          p: 2,
          mb: 3,
          minWidth: "300px",
          maxHeight: "250px",
        }}
      >
        <CheckoutCard
          items={items?.length}
          subTotal={subTotal(items)}
          shipping={shipping(items.length)}
          total={subTotal(items) + shipping(items.length)}
          setOpen={setOpen}
        />
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="error">
          Invalid Voucher Code
        </Alert>
      </Snackbar>
    </Container>
  );
}
