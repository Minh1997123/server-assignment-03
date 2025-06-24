const { validationResult } = require("express-validator");
const oderModel = require("../model/oder");
const userModel = require("../model/user.js");

// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");

// // ket noi voi ca sendfrid de gui email bang nodemailer
// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
// api_key:process.env.api_key,
//     },
//   })
// );

// // html cua email gui di sau khi oder xong
// const htmEmail = function (oder) {
//   return `<h1>${oder.useName}</h1>
//     <div>phone : ${oder.phoneNumber}</div>
//     <div>ADdress : ${oder.address}</div>
//     <table>
//         <tr>
//           <th>tên sản phâm</th>
//           <th>hình ảnh</th>
//           <th>giá</th>
//           <th>số lượng</th>
//           <th>thành tiền</th>
//         </tr>
//         <tr>
//           <td>${oder.products[0].productId.name}</td>
//           <td>
//           <img src=${oder.products[0].productId.photos[0]} alt="" />
//           </td>
//           <td>${oder.products[0].productId.price} VND</td>
//           <td>${oder.products[0].qty}</td>
//           <td>${
//             Number(oder.products[0].qty) *
//             Number(oder.products[0].productId.price)
//           }
//           VND
//           </td>
//         </tr>
//       </table>
//       <h1>tổng thanh toán : </h1>
//       <h1>${oder.total}</h1>
//       <h1>Cảm ơn bạn</h1>
//     `;
// };

// phuong thuc them oder moi
const postAddOder = async function (req, res) {
  try {
    const data = req.body;
    // kiem tra xem co loi validate nao ko
    const errValidate = validationResult(req);
    if (errValidate.array().length) {
      console.log(errValidate.array());
      return res.status(402).json(errValidate.array());
    }
    // tao  oder moi
    const oder = await oderModel.create({
      total: data.total,
      userId: req.user._id,
      phoneNumber: data.phoneNumber,
      address: data.address,
      useName: data.useName,
      email: data.email,
      products: data.products,
    });
    // luu vao database
    await oder.save();
    // xoa cart di sau khi tao oder moi
    const user = await userModel.findByIdAndUpdate(req.user._id, {
      carts: [],
      new: true,
    });
    // luu lai thong tin vao ss
    req.session.user = user;
    res.status(200).json(oder);
    // // an di vi apikey het han
    // // gui email sau khi oder xong
    // await oder.populate("products.productId");
    // return transporter.sendMail({
    //   to: oder.email,
    //   form: "minhncfx20455@funix.edu.vn",
    //   subject: "oder succeeded",
    //   html: htmEmail,
    // });
  } catch (err) {
    res.sendStatus(404);
  }
};

// phuong thuc lay toan bo oder
const getOder = async function (req, res) {
  try {
    const userId = req.user._id;
    // lau toan bo oder
    const listOder = await oderModel.find({
      userId: userId,
    });
    // gui du lieu ve
    res.status(200).json(listOder);
  } catch (err) {
    res.sendStatus(404);
  }
};
// phuong thuc lay thong tin cua 1 oder
const getOderDeatil = async function (req, res) {
  try {
    const oderId = req.params.oderId;
    // tim oder theo id
    const oder = await oderModel.findById(oderId);
    // lay thong tin san pham co trong oder
    await oder.populate("products.productId");
    res.status(200).json(oder);
  } catch (err) {
    res.sendStatus(404);
  }
};
module.exports = { postAddOder, getOder, getOderDeatil };
