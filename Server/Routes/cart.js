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
  const userId = req.body.userId;
  const productdetails = req.body;

  try {
    // Check if product already exists in the cart
    const user = await User.findOne({ userId: userId });
    const existingProduct = user.cart.find(
      (product) => product.productId === productdetails.productId
    );
    

    if (existingProduct) {
      // If the product already exists, update the quantity
      const updatedQuantity =
        existingProduct.quantity + productdetails.quantity;
      const updatedPrice = productdetails.price * updatedQuantity;
    
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
  const userId= req.body.userId;
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
        res.status(400).send("Error removing product from cart");
      }
    } else {
      res.status(200).json("Product not present in cart");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Error removing product from cart");
  }
});

//GET USER CART
router.post("/cartItems", async (req, res) => {
  const userId = req.body.userId;
 console.log(req.body);
  if (!userId) {
    return res.status(400).json({ message: "Cookie header missing" });
  }


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

//Update the quantity of existing cart product  by 1 and also their prices
router.get("/updateby1", async (req, res) => {
  const cartuser = req.headers.cookie;
  if (!cartuser) {
    return res.status(400).json({ message: "Cookie header missing" });
  }
  const userId = cartuser.split("=")[1];
  console.log(userId)
  const productId = req.query.productId;
  console.log(productId)
  try {
    // Find the user and the product in the cart
    const user = await User.findOne({ userId: userId });
    const product = user.cart.find((p) => p.productId === productId);
    console.log(product)

    if (product) {
      // Increase the quantity and update the price
      const updatedQuantity = product.quantity + 1;
      const updatedPrice = product.price * updatedQuantity;

      // Update the quantity and price in the cart
      const result = await User.updateOne(
        { userId: userId, "cart.productId": productId },
        {
          $set: {
            "cart.$.quantity": updatedQuantity,
            "cart.$.price": updatedPrice,
          },
        }
      );

      if (result.modifiedCount > 0) {
        // Get the updated cart from the database
        const updatedCart = await User.findOne({ userId: userId });
        console.log(updatedCart);
        res.status(200).json({ cart: updatedCart.cart });
      } else {
        res
          .status(400)
          .send({ message: "Error updating product quantity in cart" });
      }
    } else {
      res.status(400).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error updating product quantity in cart" });
  }
});

router.get("/totalcartamount/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findOne({ userId: userId });
    const cartItems = user.cart;
    let totalAmount = 0;

    for (let i = 0; i < cartItems.length; i++) {
      totalAmount += cartItems[i].price*cartItems[i].quantity;
    }

    res.status(200).json({ totalAmount });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error calculating total cart amount" });
  }
});

module.exports = router;