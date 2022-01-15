const { Router } = require("express");
const auth = require("@middleware/auth");
const router = Router();
import User from "@models/user";

router.get("/:term", auth, async (req, res) => {
  if (!req.user) {
    return res.send({ success: false, message: "Invalid Credentials" });
  }

  const user = await User.findOne({ _id: req.user.id });
  if (user.role !== "customer") {
    return res.send({ success: false, message: "Malformed Request" });
  }

  return res.send({ success: true, cart: req.user.cart });
});
