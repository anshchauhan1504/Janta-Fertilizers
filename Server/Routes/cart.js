
const User = require("../Models/User");
const router = require("express").Router();

//CREATE
router.get("/cartItems", async (req, res) => {
  try {
    const userId = req.headers.cookie;
    res.status(200).json(userId.split("="));
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD TO CART ->find the user and send the whole product
//Remove cart ->find the user and remove one item and send
router.post("/addtocart", async (req, res) => {
  const cartuser = req.headers.cookie;
  const userId = cartuser.split("=")[1];
  const productdetails=req.body;
  try {
    const result = await User.updateOne(
      { userId: userId},
      { $push: { cart: productdetails } }
    );
    res.status(200).json("success added");
    
  } catch (error) {
    res.status(500).send("Error adding product to cart");
    console.error(error);
  }  
});


//UPDATE
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Your Cart has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
