const {Router} = require("express");
const Paycheck = require("@models/paycheck");

const router = Router();

router.get("/", async (req, res) => {
    const oompaPayCheck = await Paycheck.findOne({user: req.params.id});
    res.send({success: true, oompaPayCheck});
})
router.get("/all", async (req, res) => {
    const allPaychecks = await Paycheck.find({});
    res.send({success: true, allPaychecks});
})

module.exports = router
