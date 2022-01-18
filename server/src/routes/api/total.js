const { Router } = require("express");

const router = Router();
const totalModel = require("@models/totalamount");

router.get("/", async (req, res) => {
  const total = await totalModel.findOne({});

  res.send({ success: true, total: total });
});
router.post("/update", async (req, res) => {
  const total = await totalModel.findOne({ name: "Total" });
  console.log(total);
  total.amount = req.body.amount;
  await total.save();
  res.send({ success: true, total });
});
module.exports = router;
