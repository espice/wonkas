const { Router } = require("express");
const jwt = require("jsonwebtoken");
const auth = require("@middleware/auth");
const router = Router();
const bcrypt = require("bcrypt");

//models
const User = require("@models/user");

router.post("/login", async (req, res) => {
  const type = req.body.role;
  console.log(req.body);

  if (type == "customer") {
    const dbUser = await User.findOne({ email: req.body.email });

    if (!dbUser) {
      const newUser = await new User({
        email: req.body.email,
        name: req.body.name,
        photoUrl: req.body.photoUrl,
        role: "customer",
      }).save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);

      return res
        .cookie("token", token, { httpOnly: true, maxAge: 15552000000 })
        .send({ success: true, user: newUser });
    } else {
      const token = jwt.sign({ id: dbUser._id }, process.env.JWT_KEY);

      return res
        .cookie("token", token, { httpOnly: true, maxAge: 15552000000 })
        .send({ success: true, user: dbUser });
    }
  }
  if (type == "oompaloompa") {
    const dbUser = await User.findOne({ email: req.body.email });

    if (!dbUser) {
      return res.send({ success: false, message: "Invalid Credentials" });
    }

    const match = await bcrypt.compare(req.body.password, dbUser.password);

    if (!match) {
      return res.send({ success: false, message: "Invalid Credentials" });
    }
  }

  return res.send({ success: "false", message: "Invalid Type" });
});

router.get("/me", auth, async (req, res) => {
  console.log("Hello World!");
  if (!req.user)
    return res.send({ success: false, message: "Invalid Session" });

  const user = await User.findOne({ id: req.user._id });
  res.send({ success: true, user: user });
});

router.post("/logout", auth, (req, res) => {
  res.clearCookie("token").send({ success: true });
});

module.exports = router;
