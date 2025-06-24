const express = require("express");

const adminController = require("../controller/admin");
const router = express.Router();

// post => login
router.post("/login", adminController.postAdminLogin);

// kiem tra nguoi dung dang nhap chua
router.use((req, res, next) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  next();
});
// post - logout
router.post("/logout", adminController.postAdminLogout);

// phan quyen chi admin co the goi api nay
router.use((req, res, next) => {
  if (req.user.role !== "admin") {
    return res.sendStatus(403);
  }
  return next();
});
router.get("/products", adminController.getAdminProduct);

module.exports = router;
