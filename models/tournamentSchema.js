const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    add_word: {
      type: String,
    },
    category: {
      type: String,
    },
    letter_count: {
      type: Number,
    },
    add_Attempts: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Practicemode", tournamentSchema);
