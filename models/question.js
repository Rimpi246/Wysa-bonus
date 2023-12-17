const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  q_id: { type: Number, required: true },
  desc: { type: String, required: true },
  question_type: { type: String, required: true },
  options: [Schema.Types.Mixed], // For multiple-choice questions
  timeFormat: { type: String }, // For time-based questions
  minmaxValue: { type: Number }, // For number-based questionsalue: { type: Number }
  maxValue: { type: Number }, // For number-based questions
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
