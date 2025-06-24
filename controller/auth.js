const bcrypt = require("bcrypt");
const userModel = require("../model/user");

// dang nhap bang trang login hoac bang ss
const postLogin = async (req, res) => {
  try {
    const { password, email } = req.body;
    let user;
    let isPassword = false;
    // kiem tra xem ss co user ko
    if (!req.user) {
      // tim kiem user co email  dang nhap
      user = await userModel.findOne({
        email: email,
      });
    } else {
      user = req.user;
    }
    // neu tim thay user chua email dn trong database
    if (user && !req.user) {
      // kiem tra  password
      isPassword = await bcrypt.compare(password, user.password);
    }
    // neu pass dung hoac co user trong ss
    if (isPassword || req.user) {
      // luu user vao ss va gui cockie khi chua co ss
      if (!req.user) {
        req.session.user = user;
      }
      // lay thong tin carts cua user
      await user.populate("carts.productId");
      // await data.populate("carts.productId");
      const dataUser = {
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        carts: user.carts,
      };
      return res.status(200).json(dataUser);
    }
    // neu nhu sai email hoac mat khau
    return res.status(401).json("email hoac pass khong dung");
  } catch (err) {
    return res.sendStatus(404);
  }
};

// tao tai khoan moi
const postigningUp = async (req, res) => {
  try {
    const { email, password, phoneNumber, fullName } = req.body;
    const hasUser = await userModel.findOne({
      email: email,
    });
    if (!hasUser) {
      // ma hoa pass
      const hasPassword = await bcrypt.hash(password, 12);
      // tao user moi
      const user = new userModel({
        password: hasPassword,
        carts: [],
        email,
        phoneNumber: Number(phoneNumber),
        fullName,
        role: "user",
      });
      // luu user moi vao database
      const newUser = await user.save();
      return res.status(200).json(newUser.email);
    }
    return res.status(401).json("email da co nguoi dang ky");
  } catch (err) {
    console.log(err);
    // new  co
    return res.sendStatus(404);
  }
};

// xoa ss va thoat dang nhap
const postLogout = async (req, res) => {
  try {
    // xoa session
    await req.session.destroy();
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(404);
  }
};

module.exports = {
  postigningUp,
  postLogin,
  postLogout,
};
