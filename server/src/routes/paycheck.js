const { Router } = require("express");
const Paycheck = require("@models/paycheck");
const totalModel = require("@models/totalamount");
const auth = require("@middleware/auth");
const user = require("@models/user");
const router = Router();

router.get("/all", auth, async (req, res) => {
  const id = req.user.id;
  if (!id) return res.send({ success: false, message: "Invalid Credentials" });

  const userObj = await user.findOne({ _id: id });
  if (!userObj)
    return res.send({ success: false, message: "Invalid Credentials" });

  if (!userObj.isManager)
    return res.send({ success: false, message: "Unauthorized" });

  const allPaychecks = await Paycheck.find({}).populate({
    path: "user",
    model: "User",
    select: "name email isManager photoUrl role _id",
  });
  res.send({ success: true, allPaychecks });
});
router.get("/", auth, async (req, res) => {
  const oompaPayCheck = await Paycheck.findOne({ user: req.user.id });
  res.send({ success: true, paycheck: oompaPayCheck });
});

router.get("/:id", auth, async (req, res) => {});

router.get("/update", auth, async (req, res) => {
  const paycheck = await Paycheck.findOneAndUpdate(
    { user: req.user.id },
    { amount: req.body.amount }
  );
  res.send({ success: true, paycheck });
});

router.post("/pay", auth, async (req, res) => {
  const userId = req.user.id;
  if (!userId)
    return res.send({ success: false, message: "Invalid Credentials" });

  const userObj = await user.findOne({ _id: userId });
  if (!userObj)
    return res.send({ success: false, message: "Invalid Credentials" });

  if (userObj.isManager !== true)
    return res.send({ success: false, message: "Unauthorized" });

  const paycheck = await Paycheck.findOne({ user: req.body.userId }).populate({
    path: "user",
    model: "User",
    select: "name email isManager photoUrl role _id",
  });
  if (!paycheck.salary > req.body.amount)
    return res.send({
      success: false,
      message: "You can't pay less than the worker's salary.",
    });

  var time = new Date(paycheck.nextPaycheck);
  time.setDate(time.getDate() + 30);
  paycheck.nextPaycheck = time;
  paycheck.paycheckHistory.push({
    amount: req.body.amount,
    date: new Date(),
    bonus: req.body.amount - paycheck.salary,
    collected: false,
    id: Math.random().toString(36).slice(2),
  });

  await paycheck.save();

  const totalAmount = await totalModel.findOne({});
  totalAmount.amount -= req.body.amount;

  await totalAmount.save();

  return res.send({ success: true, paycheck });
});

router.post("/collect", auth, async (req, res) => {
  const id = req.user.id;
  if (!id) return res.send({ success: false, message: "Invalid Credentials" });

  const userObj = await user.findOne({ _id: id });
  if (!userObj) {
    return res.send({ success: false, message: "Invalid Credentials" });
  }

  let paycheckObj = await Paycheck.findOne({ user: id });

  paycheckObj.paycheckHistory.map((paycheck) => {
    if (paycheck.id == req.body.paycheckId) {
      paycheck.collected = true;
    }
  });

  const newPaycheckObj = await Paycheck.findOneAndUpdate(
    { user: id },
    paycheckObj
  );
  return res.send({ success: true, paycheck: paycheckObj });
});
module.exports = router;
