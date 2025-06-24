const express = require("express");

const userController = require("../controller/user");
const userModel = require("../model/user");
const router = express.Router();

// kiem tra xem nguoi dung da dang nhap chua
router.use((req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.sendStatus(401);
});

//  patch => Add Cart
router.patch("/add-cart", userController.patchAddCart);
router.patch("/update-cart", userController.patchUpdateCart);

module.exports = router;
