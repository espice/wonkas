const { Router } = require("express");
const router = Router();

const User = require("@models/user");
const auth = require("@middleware/auth");
const managerOnly = require("@middleware/managerOnly");
const paycheck = require("@models/paycheck");
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
  const newPaycheck = await paycheck.create({
    user: newUser._id,
  })

  res.send({ success: true });
});

router.put("/manager/:userid", auth, managerOnly, async (req, res) => {
  const user = await User.findById(req.params.userid);

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.userid },
    { isManager: !user.isManager }
  );
  console.log(updatedUser)
  if (updatedUser.isManager){
    await paycheck.deleteOne({user: updatedUser._id})
  }
  else {
    await paycheck.create({
      user: updatedUser._id,
    })
  }
  

  res.send({ success: true });
});

router.delete("/:userid", auth, managerOnly, async (req, res) => {
  await User.deleteOne({ _id: req.params.userid });

  res.send({ success: true });
});

module.exports = router;
