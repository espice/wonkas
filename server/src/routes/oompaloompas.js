const { Router } = require("express");
const router = Router();

const User = require("@models/user");
const auth = require("@middleware/auth");
const managerOnly = require("@middleware/managerOnly");
const bcrypt = require("bcrypt");

const { AvatarGenerator } = require("random-avatar-generator");

router.get("/", auth, managerOnly, async (req, res) => {
  const oompas = await User.find({ role: "oompaloompa" }).select("-password");
  res.send({ success: true, oompas });
});

router.post("/", auth, managerOnly, async (req, res) => {
  const pass = await bcrypt.hash(req.body.password, 15);
  const generator = new AvatarGenerator();

  const photoUrl = generator.generateRandomAvatar();

  const newUser = await User.create({
    email: `${req.body.email}@wonka.fac`,
    name: req.body.name,
    photoUrl: photoUrl,
    password: pass,
    role: "oompaloompa",
  });
  res.send({ success: true });
});

module.exports = router;
