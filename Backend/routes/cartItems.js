const express = require("express");
const CartItems = require("../schemas/CartItems");

const router = express.Router();
const { body, validationResult } = require("express-validator");
const authenticateRequest = require("../middlewares/authRequest");

//Add to cart :Login required api/cart/add-to-cart
router.post(
  "/add-to-cart",
  [
    body("userId").exists(),
    body("productId").exists(),
    body("quantity").exists().isInt({ min: 1 }),
  ],
  authenticateRequest,
  (req, res) => {
    const { userId, productId, quantity } = req.body;
    const cartItem = new CartItems({ userId, productId, quantity });
    //express-validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    CartItems.findOne({ userId, productId }, (error, cartItemExists) => {
      if (error) res.status(500).send({ error });
      if (cartItemExists)
        CartItems.findOneAndUpdate(
          { userId, productId },
          { $set: { quantity: cartItemExists.quantity + 1 } },
          (e, docs) => {
            if (e) res.status(500).send({ e });
            if (docs) res.send({ exists: "Item existed: Quantity updated" });
          }
        );
      else
        cartItem.save((error) => {
          error
            ? res.status(500).send({ error })
            : res.status(201).send({ msg: "Successfully Added" });
        });
    });
  }
);

//GET cart Items :Login required api/cart/getcart
router.get("/getcart/:uid", authenticateRequest, (req, res) => {
  CartItems.find({ userId: req.params.uid }, (error, items) => {
    if (error) res.status(500).send({ error });
    res.send(items);
  }).populate("productId");
});

//PATCH quantity of the product :Login required  api/cart/updatecart
router.patch("/updatecart", authenticateRequest, (req, res) => {
  CartItems.findOneAndUpdate(
    { productId: req.body.productId, userId: req.user.id },
    { $inc: { quantity: req.body.increment ? 1 : -1 } },
    { new: true },
    (error, docs) => {
      if (error) res.status(500).send({ error });
      res.send(docs);
    }
  );
});

//Delete cart Item  :Login required api/cart/deletecart
router.delete("/deletecart/:cid", authenticateRequest, (req, res) => {
  CartItems.findOneAndDelete({ _id: req.params.cid }, (error, docs) => {
    if (error) res.status(500).send({ error });
    docs
      ? res.send({ msg: "Successful deletion" })
      : res.status(404).send({ msg: "No item exists" });
  });
});

module.exports = router;
