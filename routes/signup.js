const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const Question = require("../models/question");

router.post("/", async (req, res) => {
  try {
    const { nickname, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with basic information
    const newUser = new User({
      nickname,
      password: hashedPassword,
      onboardingResponses: [], // Initialize as an empty array for now
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    // Set user information in the session
    req.session.user = savedUser._id;
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
