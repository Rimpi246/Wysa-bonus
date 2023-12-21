const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const Question = require("../models/question");

router.post("/", async (req, res) => {
  try {
    const { nickname, password } = req.body;

    // Find the user by nickname
    const user = await User.findOne({ nickname });

    if (!user) {
      return res.status(401).json({ message: "Invalid nickname" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Store user information in the session
    req.session.user = user._id;

    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
