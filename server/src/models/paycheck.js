const mongoose = require("mongoose");

const paycheckSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: [true, "User is missing"],
  },
  amount: {
    type: Number,
    default: 100,
    required: [true, "Amount is missing"],
  },
  nextPayday: {
    type: Date,
    required: [true, "Payday is missing"],
  },
  salaryHistory: {
    type: [
      {
        amount: Number,
        date: Date,
        isCollected: Boolean,
      },
    ],
  },
});

const Paycheck = mongoose.model("Paychecks", paycheckSchema);
module.exports = Paycheck;
