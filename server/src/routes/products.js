const { Router } = require("express");
const auth = require("@middleware/auth");
const router = Router();

const Product = require("@models/product");
const User = require("@models/user");
router.get("/", auth, async (req, res) => {
  if (!req.user) {
    return res.send({ success: false, message: "Invalid Credentials" });
  }

  const user = await User.findOne({ _id: req.user.id });

  const products = await Product.find({});
  return res.send({ success: true, products: products });
});

router.post("/delete", auth, async (req, res) => {
  if (!req.user) {
    return res.send({ success: false, message: "Invalid Credentials" });
  }

  const user = await User.findOne({ _id: req.user.id });
  if (user.role !== "oompaloompa" || user.isManager !== true) {
    return res.send({ success: false, message: "Unauthorized" });
  }

  await Product.findOneAndDelete({ _id: req.body.id });
});

router.post("/", auth, async (req, res) => {
  if (!req.user) {
    return res.send({ success: false, message: "Invalid Credentials" });
  }

  const user = await User.findOne({ _id: req.user.id });
  if (user.role !== "customer") {
    return res.send({ success: false, message: "Malformed Request" });
  }

  const product = await new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    picture: req.body.picture,
  }).save();

  return res.send({ success: true, product: product });
});

module.exports = router;
