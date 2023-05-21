const mongoose = require("mongoose");

const fnurggSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      default: 1
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("fnurggSchema", fnurggSchema);
