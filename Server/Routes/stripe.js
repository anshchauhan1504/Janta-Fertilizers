const router = require("express").Router();
require('dotenv').config();
const Stripe = require("stripe")(process.env.REACT_STRIPE_KEY);
// console.log(process.env.REACT_STRIPE_KEY)

// const Stripe = require("stripe")("sk_test_51IcHN6SJ57Qb2c295VQCUsUzktn7i4jMOzFOXFQZa1gUZkU1yTrlSnotJKkJd84l8b1g7BxZSjnaypaA5bEnsGTy00kpMCAJNy");

router.post("/payment", (req, res) => {
  Stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "INR",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
        console.log(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;