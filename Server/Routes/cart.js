
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
  const productdetails = req.body;

  try {
    // Check if product already exists in the cart
    const user = await User.findOne({ userId: userId });
    const existingProduct = user.cart.find(
      (product) => product.productId === productdetails.productId
    );
    console.log('existingProduct:', existingProduct);

    if (existingProduct) {
      // If the product already exists, update the quantity
      const updatedQuantity = existingProduct.quantity + productdetails.quantity;
      const updatedPrice = productdetails.price * updatedQuantity;
      console.log('updatedQuantity:', updatedQuantity);
      console.log('updatedPrice:', updatedPrice);

      const result = await User.updateOne(
        { userId: userId, "cart.productId": productdetails.productId },
        { $set: { "cart.$.quantity": updatedQuantity, "cart.$.price": updatedPrice } }
      );
      console.log('result:', result);

      if (result.modifiedCount >0 ) {

        res.status(200).json({message:"Success updated product quantity in cart"});
      } else {
        res.status(400).json({message:"Error updating product quantity in cart"});
      }
    } else {
      // If the product does not exist, add it to the cart
      try {
        // Calculate the total price
        const totalPrice = productdetails.price * productdetails.quantity;
        console.log('totalPrice:', totalPrice);

        // Update the price in the productdetails object
        productdetails.price = totalPrice;
        console.log('productdetails:', productdetails);

        const result = await User.updateOne(
          { userId: userId },
          { $push: { cart: productdetails } }
        );
        console.log('result:', result);

        if (result.modifiedCount >0) {
          res.status(200).json({message:"Success added product to cart"});
        } else {
          res.status(400).json({message:"Error adding product to cart"});
        }

      } catch (error) {
        console.log(error);
        res.status(400).json({message:"Error adding product to cart"});
      }
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({message:"Error adding product to cart"});
  }
});

//REMOVE PRODUCT FROM CART

router.post("/removefromcart", async (req, res) => {
  const cartuser = req.headers.cookie;
  const userId = cartuser.split("=")[1];
  const productId = req.body.productId;

  try {
    const user = await User.findOne({ userId: userId });
    const existingProduct = user.cart.find(
      (product) => product.productId === productId
    );
    
    if (existingProduct) {
      const result = await User.updateOne(
        { userId: userId },
        { $pull: { cart: { productId: productId } } }
      );
      
      if (result.modifiedCount >0) {
        res.status(200).json("Success removed product from cart");
      } else {
        res.status(500).send("Error removing product from cart");
      }
    } else {
      res.status(200).json("Product not present in cart");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error removing product from cart");
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
