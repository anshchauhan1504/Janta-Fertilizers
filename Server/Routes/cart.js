const Cart = require("../Models/Cart");
const {
  verifytoken,
  verifytokenandadmin,
  verifytokenandauthorization
} = require("./verifytoken");

const router = require("express").Router();

//CREATE

router.post("/", verifytoken, async (req, res) => {
  const newcartitem = new Cart(req.body);

  try {
    const savedcart = await newcartitem.save();
    res.status(200).json(savedcart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id",verifytokenandauthorization, async (req, res) => {
  try {
    const updatecart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatecart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifytokenandauthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Your Cart has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifytokenandauthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifytokenandadmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;