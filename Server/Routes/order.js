const Order = require("../Models/Order");


const router = require("express").Router();

//CREATE

router.post("/",  async (req, res) => {
  const neworder = new Order(req.body);

  try {
    const savedOrder = await neworder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;