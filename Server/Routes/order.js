const Order = require("../Models/Order");
const {
  verifytoken,
  verifytokenandadmin,
  verifytokenandauthorization
} = require("./verifytoken");

const router = require("express").Router();

//CREATE

router.post("/", verifytoken, async (req, res) => {
  const neworder = new Order(req.body);

  try {
    const savedOrder = await neworder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifytokenandadmin, async (req, res) => {
  try {
    const updateorder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateorder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifytokenandadmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Your Order has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifytokenandauthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifytokenandadmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", verifytokenandadmin, async (req, res) => {
  const date = new Date();
  const lastmonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousmonth = new Date(new Date().setMonth(lastmonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousmonth } } },
      {
        $project: {
          month: { $month: "$createdAt" }, //Extract month from created at
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" }, //Summation of all the sales
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;