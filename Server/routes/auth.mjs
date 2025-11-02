import { Router } from "express";
import User from "../mongo/User.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import middlewareCondition from "../middleware/middlewareCondition.mjs";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, terms } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      terms,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("Error saving user: ", err);
    res.status(500).json({ message: "Server error!" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, "secretkeyofnotesapp@#", {
      expiresIn: "10h",
    });
    return res
      .status(200)
      .json({ message: "success", user: { username: user.username }, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/verify", middlewareCondition, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user, // THIS MUST COME FROM middlewareCondition
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Please Login" });
  }
});

export default router;
