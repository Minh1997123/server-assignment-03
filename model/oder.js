const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const oderChema = new Schema({
  total: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  useName: {
    type: String,
  },
  address: {
    type: String,
  },
  products: {
    type: [
      {
        qty: Number,
        productId: { type: Schema.Types.ObjectId, ref: "product" },
      },
    ],
  },
});

module.exports = mongoose.model("oder", oderChema);
