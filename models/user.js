import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: "Username is required!",
    unique: true,
  },
  email: {
    type: String,
    required: "Email is required!",
    unique: true,
  },
  password: {
    type: String,
    required: "Password is required",
  },
  role: {
    type: String,
    enum: ["admin", "manager", "cashier"],
    required: "Role is required",
  },
  shop_id: {
    type: Schema.Types.ObjectId,
    required: "Shop ID is required",
    ref: "Shop",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema)
