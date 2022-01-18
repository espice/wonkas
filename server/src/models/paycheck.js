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
    required: [true, "Next paycheck is missing"],
  },
  paycheckHistory: {
    type: Array,
    default: [],
  },
});

const Paycheck = mongoose.model("Paychecks", paycheckSchema);
module.exports = Paycheck;
