const router = require("express").Router();
const Product = require("../Models/Product");
const {
  verifytoken,
  verifytokenandauthorization,
  verifytokenandadmin,
} = require("./verifytoken");

//Create new product
router.post("/", verifytokenandadmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update the product
router.put("/:id", verifytokenandadmin, async (req, res) => {
  try {
    const productupdate = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(productupdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifytokenandadmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Your Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const latest = req.query.new; //Latest products
  const categorywise = req.query.category; //Get product category wise
  try {
    let products;

    if (latest) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (categorywise) {
      products = await Product.find({
        categories: {
          $in: [categorywise],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
