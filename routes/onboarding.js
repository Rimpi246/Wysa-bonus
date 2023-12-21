const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const Question = require("../models/question");
const router = express.Router();

// Middleware to check authentication
const authenticateUser = async (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized, no session user" });
  }

  // Fetch the user from the database based on the session user
  try {
    const user = await User.findById(req.session.user);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized, not in database" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Route to get individual onboarding question
router.get("/question/:q_id", authenticateUser, async (req, res) => {
  try {
    const questionId = parseInt(req.params.q_id, 10);
    console.log(questionId);
    // Fetch onboarding question from the database
    const onboardingQuestion = await Question.findOne({ q_id: questionId });

    if (!onboardingQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(onboardingQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  "/users/:user_id/submit-answer/:q_id",
  authenticateUser,
  async (req, res) => {
    try {
      res.status(200).json({ message: "It's working!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Route to submit an onboarding answer
router.post(
  "/users/:user_id/submit-answer/:q_id",
  authenticateUser,
  async (req, res) => {
    try {
      // const userId = req.user._id;
      const userId = req.params.user_id;
      const questionId = parseInt(req.params.q_id, 10);

      const { answer } = req.body;

      // Find the user
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log("Existing Responses:", user.onboardingResponses);

      // Find the user and update the onboarding response
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: userId,
          "onboardingResponses.q_id": questionId,
        },
        {
          $set: {
            "onboardingResponses.$.answer": answer,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        // If no document was found, the response doesn't exist, so add a new one
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        user.onboardingResponses.push({ q_id: questionId, answer });
        await user.save();
      }

      res
        .status(200)
        .json({ message: "Onboarding answer submitted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
