const mongoose = require("mongoose");

const paycheckSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: [true, "User is missing"],
  },
  amountDue: {
    type: Number,
    default: 0,
  },
  salary: {
    type: Number,
    default: 150,
  },
  nextPaycheck: {
    type: Date,
    default: new Date(
      new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(1)
    ),
  },
  paycheckHistory: {
    type: [
      {
        amount: Number,
        date: Date,

      },
    ],
    default: [],
  },
});

const Paycheck = mongoose.model("Paychecks", paycheckSchema);
module.exports = Paycheck;
