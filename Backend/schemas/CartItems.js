const mongoose = require("mongoose");

const CartItemSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      min: [1, "Minimum quantity should be 1"],
      required: true,
    },
    color: {
      type: String,
    },
    size: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", CartItemSchema);
