import crypto from "crypto";
import jwt from "jsonwebtoken";
import {User} from "../models/User.js"
import sendVerificationEmail from "../services/emailService.js";
export const register=async(req,res) => {
    try{
        let {fullName, email, password} = req.body;
      fullName = fullName.trim();
    email = email.trim();
    password = password.trim();
        if(!fullName || !email || !password) 
        return res.status(400).json({message: "All fields are required"})
        const existingUser=await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message: "User already exists"});
        const hashedPassword=crypto
        .createHash("sha512")
        .update(password)
        .digest("hex")
        const newUser=new User({
            fullName,
            email,
            password: hashedPassword,
        })
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });
    await sendVerificationEmail(newUser, token);
        await newUser.save();
        res.status(201).json({message: "Registration successful. Please Check Your Email To Verify"})
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
};

export const verifyEmail = async (req,res) => {
  try{
    const {token} = req.query;
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await User.findById(decoded.id);
    if(!user) return res.status(400).json({message: "User not found"});
    if (user.isEmailVerified) return res.status(400).json({message: "Email already verifed"});
    user.isEmailVerified=true;
    await user.save();
     res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);
    res.status(200).json({message: "Email verified successfully. You can now log in"})
  }
  catch(error) {
    console.error(error)
       res.redirect(`${process.env.FRONTEND_URL}/login?error=invalid_token`);
    res.status(400).json({message: "Invalid or expired token"})
  }
}

export const login=async(req,res) => {
    try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const hashedPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("hex");

    if (user.password !== hashedPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isEmailVerified)
      return res.status(403).json({ message: "Please verify your email first" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    
    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deposit=async(req,res) => {
  try {
    const user=await User.findById(req.userId);
    if(!user) return res.status(404).json({message: "User not found"});
    const {amount}=req.body;
    if(!amount || amount <=0) return res.status(400).json({message: "Invalid deposit amount"});
  user.balance=user.balance+amount;
    await user.save();
  res.status(200).json({
    message: "Deposit successful",
    newBalance: user.balance
  })

  }
  catch(error) {
    console.error(error);
    res.status(500).json({message: "Server error"})
  }
}
export const withdraw = async(req,res) => {
  try {
     const user=await User.findById(req.userId);
    if(!user) return res.status(404).json({message: "User not found"});
    const {amount}=req.body;
    if(!amount || amount <=0) return res.status(400).json({message: "Invalid deposit amount"});
    if(user.balance < amount) return res.status(400).json({message: "You don't have enough amount"})
  user.balance=user.balance-amount;
  res.status(200).json({message: "Withdraw successful",newBalance: user.balance})
  await user.save();
  }
  catch(error) {
    console.error(error);
    res.status(500).json({message: "Server error"})
  }
}
export const getDashboard = async(req,res) => {
  try {
    const user=await User.findById(req.userId);
    if(!user) return res.status(404).json(req.userId);
    const transactions = user.transactions || [];
    res.status(200).json({
      fullName: user.fullName,
      balance: user.balance || 0,
      transactions: transactions.map(tx =>({
        type: tx.type,
        amount: tx.amount,
        date: tx.date,
        balanceAfter: tx.balanceAfter
      }) )
    })
  }
  catch(err) {
    console.error(err);
    res.status(500).json({message: "Server error"});
  }
}
