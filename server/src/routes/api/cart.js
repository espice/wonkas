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
  console.log(user);
  return res.send({ success: true, cart: user.cart });
});

router.post("/update", auth, async (req, res) => {
  if (!req.user) {
    return res.send({ success: false, message: "Invalid Credentials" });
  }

  const user = await User.findOne({ _id: req.user.id });
  if (user.role !== "customer") {
    return res.send({ success: false, message: "Malformed Request" });
  }

  user.cart = req.body.cart;
  await user.save();
  return res.send({ success: true, cart: user.cart });
})
router.get("/products", auth, async (req, res) => {
  if (!req.user) {
    return res.send({ success: false, message: "Invalid Credentials" });
  }

  const user = await User.findOne({ _id: req.user.id });
  if (user.role !== "customer") {
    return res.send({ success: false, message: "Malformed Request" });
  }

  const populated_messages = await user.populate({
    path: "cart",
    model: "Product"
  })
  console.log(populated_messages.cart)
  return res.send({ success: true, cart: populated_messages.cart });
})

module.exports = router;
