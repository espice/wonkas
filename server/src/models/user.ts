import mongoose from "mongoose";

// export interface DBUserInterface extends mongoose.Document{
//     name: string;
//     email: string;
//     photoUrl: string
// }

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
  },
});

const User = mongoose.model<DBUserInterface>("User", userSchema);

export default User;
