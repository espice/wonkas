import { Router } from "express";
import jwt from "jsonwebtoken";
import auth from "@middleware/auth";
const router = Router();

//models
import User, { DBUserInterface } from "@models/user";

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

router.get("/me", auth, async (req: any, res) => {
  console.log("Hello World!");
  if (!req.user)
    return res.send({ success: false, message: "Invalid Session" });

  const user = await User.findOne({ id: req.user._id });
  res.send({ success: true, user: user });
});

router.post("/logout", auth, (req, res) => {
  res.clearCookie("token").send({ success: true });
});

export default router;
