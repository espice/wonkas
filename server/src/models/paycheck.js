const mongoose = require("mongoose");

const paycheckSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: [true, "User is missing"]
    },
    amount: {
        type: Number,
        default: 100,
        required: [true, "Amount is missing"]
    },
    time: {
        type: Date,
        required: [true, "Time is missing"]
    }
});

const Paycheck = mongoose.model("Paychecks", paycheckSchema);
module.exports = Paycheck;