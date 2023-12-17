const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  nickname: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  onboardingResponses: [
    {
      // q_id: { type: Schema.Types.ObjectId, ref: "Question" },
      q_id: { type: Number, ref: "Question" },
      question: String,
      question_type: String,
      answer: Schema.Types.Mixed, // Mixed type to accommodate various answer types
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
