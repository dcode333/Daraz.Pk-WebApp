// import {Schema} from 'mongoose'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = mongoose.Schema(
  {
    reviewer: String,
    rating: Number,
    comment: String,
    isVerified: Boolean,
  },
  { timestamps: { currentTime: () => new Date().toLocaleDateString("en-US") } }
);
const ProductSchema = Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Minimum ratings can be 0"],
      max: [5, "Maximum ratings can be 5"],
    },
    reviews: {
      type: [Review],
    },
    colors: {
      type: [String],
      required: true,
    },
    brand: {
      type: String,
      default: "No Brand",
    },
    sizes: {
      type: [Number],
    },
    inStock: {
      type: Number,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    waranty: {
      type: String,
      default: "No waranty",
    },
    catagory: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    installment: {
      type: Boolean,
    },
    sellerRatings: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Minimum ratings can be 0"],
      max: [5, "Maximum ratings can be 5"],
    },
  },
  { timestamps: { currentTime: () => new Date().toLocaleDateString("en-US") } }
);

ProductSchema.statics.findHighDiscount = function () {
  return this.find({
    $expr: {
      $gt: [
        { $divide: [{ $subtract: ["$price", "$discountedPrice"] }, "$price"] },
        0.6,
      ],
    },
  });
};

module.exports = mongoose.model("product", ProductSchema);
