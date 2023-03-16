const express = require('express');
const app = express();
const mongoose = require('mongoose');
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
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running!');
});

