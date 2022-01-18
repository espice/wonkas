const { Router } = require("express");
const auth = require("@middleware/auth");

const User = require("@models/user");

const router = Router();

router.get("/", auth, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne({ _id: userId });

  res.send({ success: true, tasks: user.tasks });
});

router.post("/complete/:taskId", auth, async (req, res) => {
  const result = await User.updateOne(
    { _id: req.user.id, "tasks._id": req.params.taskId },
    { $set: { "tasks.$.completed": true } }
  );
  res.send({ success: true, result });
});

router.post("/incomplete/:taskId", auth, async (req, res) => {
  const result = await User.updateOne(
    { _id: req.user.id, "tasks._id": req.params.taskId },
    { $set: { "tasks.$.completed": false } }
  );
  res.send({ success: true, result });
});

module.exports = router;
