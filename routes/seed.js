const express = require("express");
const router = express.Router();
const Question = require("../models/question");

router.post("/", async (req, res) => {
  const questionsToSeed = [
    {
      q_id: 1,
      desc: "Sleep goals",
      question_type: "multiple-choice",
      options: ["Sleep early", "Sleep through the night", "On time"],
    },
    {
      q_id: 2,
      desc: "Sleep struggle duration",
      question_type: "single-choice",
      options: ["< 2 weeks", "2-8 weeks", "> 8 weeks"],
    },
    {
      q_id: 3,
      desc: "Sleep time",
      question_type: "time",
      options: { "time-Format": "12-hour" },
    },
    {
      q_id: 4,
      desc: "Wake-up time",
      question_type: "time",
      options: { "time-Format": "12-hour" },
    },
    {
      q_id: 5,
      desc: "Sleep duration",
      question_type: "number",
      options: { minValue: 1, maxValue: 10 },
    },
  ];

  try {
    // questions already exist in the database
    const existingQuestions = await Question.find();

    if (existingQuestions.length === 0) {
      await Question.create(questionsToSeed);
      res.json({ message: "Questions seeded successfully" });
    } else {
      res.json({ message: "Questions already exist in the database" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
