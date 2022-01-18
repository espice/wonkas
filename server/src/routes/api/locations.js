const { Router } = require("express");
const auth = require("@middleware/auth");
const user = require("@models/user");
const User = require("../../models/user");
const router = Router();

router.get("/all", auth, async (req, res) => {
  if (!req.user) {
    return res.send({ success: false, message: "Invalid Credentials" });
  }

  const userObj = await user.findOne({ _id: req.user.id });
  if (!userObj.isManager) {
    return res.send({ success: false, message: "Malformed Request" });
  }

  return res.send({
    success: true,
    locations: [
      "Nut Room",
      "Inventing Room",
      "Testing Room",
      "Chocolate Room",
      "Chocolate River",
      "Storage",
      "Supply",
      "Elevator",
      "Reception",
    ],
  });
});

router.post("/updateuser", auth, async (req, res) => {
  if (!req.user) {
    return res.send({ success: false, message: "Invalid Credentials" });
  }
  
  const UserObj = await user.findOne({_id: req.body.oompaId})
  console.log(req.body.location)
  UserObj.location = req.body.location;
  await UserObj.save();
  return res.send({success: true, UserObj});

})
module.exports = router;
