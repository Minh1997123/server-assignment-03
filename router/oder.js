const express = require("express");
const { check } = require("express-validator");

const oderController = require("../controller/oder");

const router = express.Router();

// kiem tra fonm thong tin khach hang
const validatorAddOder = [
  // kiem tra username
  check("useName")
    // khong de trong
    .notEmpty(),
  // kiem tra email
  check("email")
    // khong de trong
    .notEmpty()
    // kiem tra dinh dang email
    .isEmail(),
  // kiem tra phoneNumber
  check("phoneNumber")
    // khong de trong
    .notEmpty(),
  // kiem tra address
  check("address")
    // khong de trong
    .notEmpty(),
  check("products").notEmpty(),
  check("total").notEmpty(),
];
// kiem tra xem nguoi dung da dang nhap chua
router.use((req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.sendStatus(401);
});
// post => add oder
router.post("/add-oder", validatorAddOder, oderController.postAddOder);

// get => oder
router.get("/oders", oderController.getOder);

// get => oder detail
router.get("/oder-detail/:oderId", oderController.getOderDeatil);

module.exports = router;
