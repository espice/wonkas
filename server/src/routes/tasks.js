const { Router } = require("express");
const auth = require("@middleware/auth");

const User = require("@models/user");

const router = Router();

router.get("/", auth, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.send({ success: false, message: "Invalid Credentials" });
  }

  res.send({ success: true, tasks: user.tasks });
});

router.get("/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.send({ success: false, message: "Invalid Credentials" });
  }

  const oompa = await User.findOne({ _id: req.params.id });
  res.send({ success: true, tasks: oompa.tasks });
});

router.post("/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne({ _id: userId });

  if (user.isManager !== true) {
    return res.send({ success: false, message: "Unauthorized" });
  }

  const oompa = await User.findOne({ _id: req.params.id });

  oompa.tasks.push(req.body.task);
  await oompa.save();

  res.send({ success: true, tasks: oompa.tasks });
});

router.delete("/:id/:taskId", auth, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne({ _id: userId });

  if (user.isManager !== true) {
    return res.send({ success: false, message: "Unauthorized" });
  }

  let oompa = await User.findOne({ _id: req.params.id });
  oompa.tasks.map((task) => {
    if (task._id == req.params.taskId) {
      oompa.tasks.splice(oompa.tasks.indexOf(task), 1);
    }
  });

  await oompa.save();

  res.send({ success: true, tasks: oompa.tasks });
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
