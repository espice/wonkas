const {Router} = require("express");
const Paycheck = require("@models/paycheck");
const User = require("@models/user");
const router = Router();

router.get("/", async (req, res) => {
    const oompaPayCheck = await Paycheck.findOne({user: req.params.id});
    res.send({success: true, oompaPayCheck});
})
router.get("/all", async (req, res) => {
    const allPaychecks = await Paycheck.find({}).populate({
        path: "user",
        model: "User",
    })
    res.send({success: true, allPaychecks});
})

router.get("/update", async (req, res) => {
    const paycheck = await Paycheck.findOne({user: req.params.id});
    paycheck.amount = req.body.amount;
    
    await paycheck.save();
    res.send({success: true, paycheck});
})

module.exports = router
