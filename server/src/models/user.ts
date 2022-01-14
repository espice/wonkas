import mongoose from "mongoose";

export interface DBUserInterface extends mongoose.Document, UserInterface {}

const userSchema = new mongoose.Schema({
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
  role: {
    type: ["oompaloompa", "customer"],
    required: [true, "User type is missing"],
  },
  isManager: { type: Boolean, default: false },
  tasks: { type: Array, default: [] },
  notifs: { type: Array, default: [] },
  location: { type: String },
});

const User = mongoose.model<DBUserInterface>("User", userSchema);

export default User;
