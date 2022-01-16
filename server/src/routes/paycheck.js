const {Router} = require("express");
const Paycheck = require("@models/paycheck");

const router = Router();

router.get("/", async (req, res) => {
    const oompaPayCheck = await Paycheck.findOne({user: req.params.id});
    res.send({success: true, oompaPayCheck});
})

module.exports = router
