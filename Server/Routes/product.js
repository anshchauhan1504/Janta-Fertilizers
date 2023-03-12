const router = require("express").Router();
const product = require("../Models/Product");
const {
  verifytoken,
  verifytokenandauthorization,
  verifytokenandadmin,
} = require("./verifytoken");

router.post("/", verifytokenandadmin, async (req, res) => {
  const newProduct = new product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
