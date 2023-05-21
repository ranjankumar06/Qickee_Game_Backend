const mongoose = require("mongoose");

const beatchSchema = new mongoose.Schema(
  {

    payout_batch_id: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("beatchSchema", beatchSchema);
