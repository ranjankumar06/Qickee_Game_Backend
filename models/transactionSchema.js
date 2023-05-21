const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
    },
    amount: {
      type: Number,
    },
    reason: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transactions", transactionSchema);
