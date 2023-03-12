const router = require("express").Router();
const User = require("../Models/User");
const {
  verifytoken,
  verifytokenandauthorization,
  verifytokenandadmin,
} = require("../Routes/verifytoken");

//UPDATE

router.put("/:id", verifytokenandauthorization, async (req, res) => {
  //We have to decide whether this token belongs to client or admin
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updateuser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //take everything inside req.body and set it and alone doing this will not return updated value
      },
      { new: true }
    );
    res.status(200).json(updateuser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", verifytokenandauthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get user

router.get("/find/:id", verifytokenandadmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all user

router.get("/", verifytokenandadmin, async (req, res) => {
  const query = req.query.new; //It will return latest users
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find(); //It will return latest 5 user
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get user stats
router.get("/stats", verifytokenandadmin, async (req, res) => {
  const date = new Date(); //Current date
  const lyear = new Date(date.setFullYear(date.getFullYear() - 1)); //last year date
  try {
    const data = await User.aggregate([  //For grouping the items
      { $match: { createdAt: { $gte: lyear } } }, //matching
      {
        $project: {
          month: { $month: "$createdAt" }, //It will extract the month from created at
        },
      },
      {
        $group: {
          _id: "$month", //id will be month from project
          total: { $sum: 1 }, //It will sum all the registered user and will show in total user
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
// router.get("/usertest",(req,res)=>{ //Request getting from the user that he is providing such as email,password etc. After that we are sending response to user through res
// res.send("User test is successfull");

// });

// router.post("/Userposttest",(req,res)=>{
//     const username=req.body.username;
//     console.log(username);
// })
