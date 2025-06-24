const express = require("express");

const authenController = require("../controller/auth");
const router = express.Router();

// post => login
router.post("/login", authenController.postLogin);

// post => logout
router.post("/logout", authenController.postLogout);

// post => sign-up
router.post("/sign-up", authenController.postigningUp);

module.exports = router;
