const { Router } = require("express");

const auth = require("@middleware/auth");
const router = Router();

const User = require("@models/user");
router.get("/", auth, async (req, res) => {
  if (!req.user) {
    return res.send({ success: false, message: "Invalid Credentials" });
  }

  const user = await User.findOne({ _id: req.user.id });
  if (user.role !== "customer") {
    return res.send({ success: false, message: "Malformed Request" });
  }

  return res.send({ success: true, cart: req.user.cart });
});

module.exports = router;
