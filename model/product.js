const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  category: {
    type: String,
    enum: [
      "iphone",
      "ipad",
      "watch",
      "airpod",
      "macbook",
      "mouse",
      "keyboard",
      "other",
    ],
  },
  photos: {
    type: [String],
  },
  long_desc: {
    type: String,
  },
  short_desc: {
    type: String,
  },
  price: {
    type: Number,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("product", productSchema);
