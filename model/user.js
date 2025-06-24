const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: { type: String },
  role: { type: String, enum: ["user", "admin", "consultant"] },
  phoneNumber: { type: Number },
  carts: {
    type: [
      {
        qty: Number,
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
      },
    ],
  },
});

module.exports = mongoose.model("user", userSchema);
