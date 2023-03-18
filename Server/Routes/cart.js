const User = require("../Models/User");
const router = require("express").Router();

//CREATE
// router.get("/cartItems", async (req, res) => {
//try {
//     const userId = req.headers.cookie;
//     res.status(200).json(userId.split("="));
//   } catch (err) {
//     res.status(500).json(err);
//   }
//
// });

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
    console.log("existingProduct:", existingProduct);

    if (existingProduct) {
      // If the product already exists, update the quantity
      const updatedQuantity =
        existingProduct.quantity + productdetails.quantity;
      const updatedPrice = productdetails.price * updatedQuantity;
      console.log("updatedQuantity:", updatedQuantity);
      console.log("updatedPrice:", updatedPrice);

      const result = await User.updateOne(
        { userId: userId, "cart.productId": productdetails.productId },
        {
          $set: {
            "cart.$.quantity": updatedQuantity,
            "cart.$.price": updatedPrice,
          },
        }
      );
      console.log("result:", result);

      if (result.modifiedCount > 0) {
        res
          .status(200)
          .json({ message: "Success updated product quantity in cart" });
      } else {
        res
          .status(400)
          .json({ message: "Error updating product quantity in cart" });
      }
    } else {
      // If the product does not exist, add it to the cart
      try {
        // Calculate the total price
        const totalPrice = productdetails.price * productdetails.quantity;
        console.log("totalPrice:", totalPrice);

        // Update the price in the productdetails object
        productdetails.price = totalPrice;
        console.log("productdetails:", productdetails);

        const result = await User.updateOne(
          { userId: userId },
          { $push: { cart: productdetails } }
        );
        console.log("result:", result);

        if (result.modifiedCount > 0) {
          res.status(200).json({ message: "Success added product to cart" });
        } else {
          res.status(400).json({ message: "Error adding product to cart" });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error adding product to cart" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error adding product to cart" });
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

      if (result.modifiedCount > 0) {
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

//GET USER CART
router.get("/cartItems", async (req, res) => {
  const cartuser = req.headers.cookie;

  if (!cartuser) {
    return res.status(400).json({ message: "Cookie header missing" });
  }

  const userId = cartuser.split("=")[1];

  try {
    const user = await User.findOne({ userId: userId });
    const cartItems = user.cart;
    console.log("cartItems:", cartItems);

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error retrieving cart items" });
  }
});

//Get the total price of items stored in cart array of user
router.get("/totalamount", async (req, res) => {
  const cartuser = req.headers.cookie;

  if (!cartuser) {
    return res.status(400).json({ message: "Cookie header missing" });
  }

  const userId = cartuser.split("=")[1];

  try {
    const user = await User.findOne({ userId: userId });
    const cartItems = user.cart;
    let totalAmount = 0;

    for (let i = 0; i < cartItems.length; i++) {
      totalAmount += cartItems[i].price;
    }

    res.status(200).json({ totalAmount });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error retrieving total amount" });
  }
});

//Get the total length of user cart array
router.get("/totalitems", async (req, res) => {
  const cartuser = req.headers.cookie;

  if (!cartuser) {
    return res.status(400).json({ message: "Cookie header missing" });
  }

  const userId = cartuser.split("=")[1];

  try {
    const user = await User.findOne({ userId: userId });
    const cartItems = user.cart;
    const totalItems = cartItems.length;

    res.status(200).json({ totalItems });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error retrieving total items" });
  }
});

module.exports = router;
