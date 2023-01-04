const express = require("express");
const { count } = require("../schemas/Products");
const Products = require("../schemas/Products");
const router = express.Router();
// require("dotenv").config();
// const { body, validationResult } = require("express-validator");
// const authenticateRequest = require("../middlewares/authRequest");

//Get all the products :No login required
router.get("/getproducts/:count", (req, res) => {
  if (isNaN(req.params.count))
    return res.status(200).send({ error: "Invalid Route Parameter" });
  Products.find((error, products) => {
    if (error) res.status(500).send({ error });
    else res.status(200).send(products);
  }).limit(req.params?.count);
});

router.get("/getsaleproducts", (req, res) => {
  Products.findHighDiscount().exec((error, products) => {
    if (error) {
      res.status(500).send({ error });
    } else {
      res.status(200).send(products);
    }
  });
});

//Get single product detail by id :No login required
router.get("/getproduct/:id", (req, res) => {
  Products.findOne({ _id: req.params.id }, (error, product) => {
    if (error) res.status(500).send({ error });
    else res.status(200).send({ product });
  });
});

// router.get("/setproduct", (req, res) => {
//   const products = new Products({
//     price: 800,
//     discountedPrice: 150,
//     description: "Silver Plated Six Claws Ring for Girls and Women",
//     colors: ["black", "gray"],
//     sizes: [16, 18, 19],
//     ratings: 4,
//     reviews: [
//       {
//         reviewer: "Umair F",
//         rating: 3,
//         comment: "Good product and fast delivery, will buy again",
//         isVerified: true,
//       },
//       {
//         reviewer: "Umair F",
//         rating: 3,
//         comment: "Good product and fast delivery, will buy again",
//         isVerified: true,
//       },
//       {
//         reviewer: "Ali F",
//         rating: 4,
//         comment: "Behtreen product",
//         isVerified: true,
//       },
//       {
//         reviewer: "Hatim",
//         rating: 3,
//         comment: "Good product and fast delivery, will buy again",
//         isVerified: true,
//       },
//     ],
//     brand: "jewels",
//     inStock: 203,
//     seller: "Shockat stores",
//     waranty: "2 months",
//     catagory: "jewelery",
//     images: [
//       "https://static-01.daraz.pk/p/699cd22340c7462888e8ef9918a6bff7.jpg",
//       "https://static-01.daraz.pk/p/de3f71c0a2d590febb6290a104af1a81.jpg",
//     ],
//     installment: true,
//     sellerRatings: 2,
//   });
//   products.save((error) => {
//     error
//       ? res.status(500).send({ error })
//       : res.status(201).send({ msg: "Successfully Added" });
//   });
// });


router.post("/setreviews/:pid", (req, res) => {
  review = req.body;
  console.log(req.params.pid);
  Products.updateOne(
    { _id: req.params.pid },
    {
      $push: {
        reviews: review,
      },
    }
  )
    .then((data) => {
      Products.findOne({ _id: req.params.pid }, (error, product) => {
        if (error) res.status(500).send({ error });
        else res.status(200).send({ reviews: product.reviews });
      });
    })
    .catch((error) => res.status(500).send({ error }));
});

module.exports = router;
