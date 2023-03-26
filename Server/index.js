const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./Routes/auth');
const productRoute = require('./Routes/product');
const cartRoute = require('./Routes/cart');
const orderRoute = require('./Routes/order');
const stripeRoute = require("./Routes/stripe");
const cookieParser = require('cookie-parser');
dotenv.config();
process.env.NODE_OPTIONS = "--unhandled-rejections=strict";
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Db Connection Successfull!'))
  .catch((err) => {
    console.log(err);
  });

//   function allowCrossDomain(req, res, next) {
//     const origin = req.get('origin');
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials', 'true');
  
//     next();
//   }

// app.use(allowCrossDomain);
app.use(cors({
  credentials: true,
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(cookieParser(process.env.PASS_SEC, {
  sameSite: 'none',
  secure: true
}));
// app.use(cookieParser());
// app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running!');
});

