const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is missing"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is missing"],
    },
    photoUrl: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "",
    },
    role: {
      type: ["oompaloompa", "customer"],
      required: [true, "User type is missing"],
    },
    isManager: { type: Boolean, default: false },
    tasks: { type: Array, default: [] },
    notifs: { type: Array, default: [] },
    location: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;