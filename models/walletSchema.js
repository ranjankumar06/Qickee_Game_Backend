const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      ref: 'users'
    },
    currency: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("wallet", walletSchema);
