const mongoose = require("mongoose")

const totalamountSchema = mongoose.Schema({
        amount: {
            type: Number,
            default: 0
        },
        name: {
            type: String,
            default: "Total"
        }
})

const TotalModel = mongoose.model("TotalAmount", totalamountSchema)

module.exports =   TotalModel