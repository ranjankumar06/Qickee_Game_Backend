const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    transaction_amount: {
      type: Number,
    },
    reason: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ledgermodels", ledgerSchema);
