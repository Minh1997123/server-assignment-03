require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productRouter = require("./router/product");
const userRouter = require("./router/user");
const oderRouter = require("./router/oder");
const authRouter = require("./router/authen");
const adminRouter = require("./router/admin");
const userModel = require("./model/user");
const session = require("express-session");
const mongodbSesstion = require("connect-mongodb-session");

const app = express();

const uriDb = process.env.MONGODB_URI;
// thiet lap post de deploy
const POST = process.env.PORT || 5000;
console.log(uriDb);
app.use(
  cors({
    // bat buoc de nhan cookie tu http://localhost:3000 va http://localhost:3001
    origin: [
      `https://assignment-03-admin.vercel.app`,
      `https://assignment-03-client-chi.vercel.app`,
    ],
    credentials: true,
  })
);

app.use(express.json());

// ket noi voi database va tao store de luu session
const mongodbSesstionStore = mongodbSesstion(session);
const store = new mongodbSesstionStore({
  uri: uriDb,
  collection: "sessions",
});

// tao session
app.use(
  session({
    secret: "assignment03",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// lay du lieu user tu ss de thuc hien cac thao tac yeu cao user
app.use(async (req, res, next) => {
  if (req.session.user) {
    const user = await userModel.findById(req.session.user._id);
    req.user = user;
  }
  next();
});

// admin
app.use("/admin", adminRouter);
// authen
app.use(authRouter);
//  product
app.use(productRouter);
// user
app.use(userRouter);
// oder
app.use(oderRouter);

mongoose
  .connect(uriDb)
  .then(() => {
    app.listen(POST);
  })
  .catch((err) => {
    console.log(err);
  });
