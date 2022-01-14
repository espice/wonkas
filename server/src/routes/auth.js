const { Router } = require("express");
const jwt = require("jsonwebtoken");
const auth = require("@middleware/auth");
const router = Router();

//models
const User = require("@models/user");

router.post("/login", async (req, res) => {
  const type = req.body.role;

  if (type == "customer") {
  }
  if (type == "oompaloompa") {
  }

  return res.send({ success: "false", message: "Invalid Type" });
});

// router.post("/login", async (req: any, res: any) => {
//   console.log(req.body);
//   if (!req.body.name || !req.body.email || !req.body.photoUrl)
//     return res.send({ success: false, message: "Missing Credentials" });

//   const user: UserInterface = {
//     name: req.body.name,
//     email: req.body.email,
//   };

//   const mongooseUser: DBUserInterface | null = await User.findOne({
//     email: user.email,
//   });
//   if (!mongooseUser) {
//     const newUser = await User.create(user);
//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY!);

//     return res
//       .cookie("token", token, { httpOnly: true, maxAge: 15552000000 })
//       .send({ success: true, user: newUser });
//   }

//   const token = jwt.sign({ id: mongooseUser._id }, process.env.JWT_KEY!);
//   return res
//     .cookie("token", token, { httpOnly: true, maxAge: 15552000000 })
//     .send({ success: true, user: mongooseUser });
// });

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
