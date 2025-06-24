const bcrypt = require("bcrypt");
const userModel = require("../model/user");
const productModel = require("../model/product");

// dang nhap cho admin
const postAdminLogin = async function (req, res) {
  try {
    const { password, email } = req.body;
    let user;
    // kiem tra xem co ss khong
    if (!req.user) {
      // neu khong co thi tim kiem trong database user co email da dang nhap
      user = await userModel.findOne({
        email: email,
      });
    } else {
      // neu co
      user = req.user;
    }
    // neu khong tim thay user co cung email
    if (!user) {
      return res.sendStatus(401);
    }
    // kiem tra role nguoi dang nhap
    if (user.role === "user") {
      return res.sendStatus(401);
    }
    // kiem tra pass khi khong co ss
    if (!req.user) {
      const isPassword = await bcrypt.compare(password, user.password);
      // neu pass khong dung
      if (!isPassword) {
        return res.sendStatus(401);
      }
    }
    // luu ss moi khi chua co ss
    if (!req.user) {
      req.session.user = user;
    }
    //   gui thong tin ve
    return res.status(200).json(user.email);

    // return res.status(200).json(user.email);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

// phuong thuc lay toa bo san pham tu admin
const getAdminProduct = async function (req, res) {
  if (req.user.role !== "admin") {
    return res.sendStatus(403);
  }
  const products = await productModel.find();
  res.status(200).json(products);
};

const postAdminLogout = async (req, res) => {
  try {
    // xoa session
    await req.session.destroy();
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(404);
  }
};
module.exports = {
  postAdminLogin,
  getAdminProduct,
  postAdminLogout,
};
