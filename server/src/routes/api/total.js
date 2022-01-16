const {Router} = require("express")

const router = Router()
const totalModel = require("@models/totalamount")

router.get("/", async (req,res)=>{
    const total = await totalModel.findOne({name: "Total"})
    console.log(total)
    if (total === null){
        console.log("let me see")
        const total = await new totalModel({
            name: "Total",
            amount: 0
        }).save()
        res.send({success: true, total})
    }
    else {
        console.log(total, "hi")
        res.send({success: true, total:total})
    }
    
})
router.post("/update", async(req,res)=>{
    const total = await totalModel.findOne({name: "Total"})
    console.log(total)
    total.amount = req.body.amount
    await total.save()
    res.send({success: true, total})

})
module.exports = router