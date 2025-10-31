import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["deposit", "withdraw"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  balanceAfter: { type: Number, required: true },
});
const userSchema=new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isEmailVerified: {type: Boolean, default: false},
    balance: {type: Number, default:0},
    transactions: [transactionSchema],
},
    {timestamps: true}
)
export const User=mongoose.model("User",userSchema);