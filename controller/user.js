const { assign } = require("nodemailer/lib/shared");
const userModel = require("../model/user");

// phuong thuc them san pham vao cart cua
const patchAddCart = async function (req, res) {
  try {
    const { data, quantity } = req.body;
    const user = req.user;
    // tim xem trong cart cua user da co san pham them vao chua
    const cartItem = user.carts.find((cart) => {
      return cart.productId.toString() === data._id;
    });
    // tao cart moi
    let newCartItem = {
      productId: data._id,
      qty: quantity,
    };
    let newCarts = [];
    // neu da co trong cart
    if (cartItem) {
      // tinh lai so luong san pham moi
      newCartItem.qty = Number(newCartItem.qty) + Number(cartItem.qty);
      // tao update lai cart bang so luong moi
      newCarts = user.carts.map((cart) => {
        const isCart =
          cart.productId.toString() === newCartItem.productId.toString();
        // neu la san pham da co thi tra ra san pham co so luong moi
        if (isCart) {
          return newCartItem;
        } else {
          return cart;
        }
      });
    }
    // neu chua co
    else {
      newCarts = [...user.carts, newCartItem];
    }
    //   them cart moi
    const newUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        carts: newCarts,
      },
      {
        new: true,
      }
    );
    // tra ss moi ve
    req.session.user = newUser;
    res.status(200).json(newUser.carts);
  } catch (err) {
    res.sendStatus(404);
  }
};

// phuong thuc update lai so luong va xoa san pham trong cart
const patchUpdateCart = async function (req, res) {
  try {
    // lay du lieu tu req
    const { data, quantity } = req.body;
    // tao user tu thong tin user o ss
    const user = req.user;
    // tim kiem cart item dang can update
    const cart = user.carts.find((item) => {
      return item.productId.toString() === data._id.toString();
    });
    // tao danh sach cart moi
    let newCarts = [];
    // neu so luong san pham nho hon 1
    if (quantity < 1) {
      // loai bo san pham khoi cart
      newCarts = user.carts.filter((item) => {
        return item._id.toString() !== cart._id.toString();
      });
    }
    // neu lon hon 1
    else {
      // chinh sua lai so luong san pham thoe so luong duoc gui len
      newCarts = user.carts.map((item) => {
        const isCart = item._id.toString() === cart._id.toString();
        if (isCart) {
          item._doc.qty = quantity;
        }
        return item;
      });
    }
    // update lai danh cart
    const newUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        carts: newCarts,
      },
      {
        new: true,
      }
    );
    // luu thong tin moi vao ss
    req.session.user = newUser;
    // gui lai cho ket qua
    return res.status(200).json(newUser.carts);
  } catch (err) {
    res.sendStatus(404);
  }
};
module.exports = {
  patchAddCart,
  patchUpdateCart,
};
