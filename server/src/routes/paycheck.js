const { Router } = require("express");
const Paycheck = require("@models/paycheck");
const auth = require("@middleware/auth");

const router = Router();

router.get("/", auth, async (req, res) => {
  const oompaPayCheck = await Paycheck.findOne({ user: req.user.id });
  res.send({ success: true, paycheck: oompaPayCheck });
});
router.get("/all", async (req, res) => {
  const allPaychecks = await Paycheck.find({}).populate({
    path: "user",
    model: "User",
    select: "name email isManager photoUrl role _id",
  });
  res.send({ success: true, allPaychecks });
});

router.get("/update", auth, async (req, res) => {
  const paycheck = await Paycheck.findOneAndUpdate(
    { user: req.user.id },
    { amount: req.body.amount }
  );
  res.send({ success: true, paycheck });
});

module.exports = router;
