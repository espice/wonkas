const { Router } = require("express");
const auth = require("@middleware/auth");
const router = Router();
const message = require("@models/message");
const user = require("@models/user");

router.get("/:location", auth, async (req, res) => {
  const userId = req.user.id;
  const userObj = await user.findOne({ _id: userId });

  if (!req.user) {
    return res.send({ success: false, message: "Unauthorized" });
  }

  const location = req.params.location;
  const messages = await message.find({ location: location }).populate({
    path: "author",
    model: "User",
    select: "name email isManager photoUrl role _id",
  });

  return res.send({ success: true, messages: messages });
});

module.exports = router;
