const express = require("express");

const router = express.Router();

const prodroductController = require("../controller/product");

// get products
router.get("/products", prodroductController.getProduct);
// router get = product detail
router.get("/product/:productId", prodroductController.getDetailProduct);

module.exports = router;
