const productModel = require("../model/product");

// phuong thuc lay toan bo san pham
const getProduct = async function (req, res, next) {
  try {
    // lay thong tin cua toan bo san pham
    const data = await productModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.sendStatus(401);
    console.log(err);
  }
};

// phuong thuc lay san pham so huu cua nguoi dung
const getDetailProduct = async function (req, res, next) {
  try {
    const productId = req.params.productId;
    // tim product theo id
    const product = await productModel.findById(productId);
    // lay nhung san pham lien quan nhung den san pham can xemn
    const relatedProduct = await productModel.find({
      category: product.category,
    });
    // loai bo san pham dang xem ra khoir danh sach
    const newRelatedProduct = relatedProduct.filter((item) => {
      return item._id.toString() !== productId.toString();
    });
    // them danh sach cac san pham lien quan cho product
    product._doc.relatedItems = newRelatedProduct;
    res.status(200).json(product);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  getProduct,
  getDetailProduct,
};
