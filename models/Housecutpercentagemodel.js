const mongoose = require("mongoose");

const HousecutPercentageSchema = new mongoose.Schema(
  {
    add_Housepercentagecut: {
      type: Number,
    },
    // _id:{
    //   type: mongoose.Schema.Types.ObjectId,
    // },
  },
  { timestamps: true }
);
module.exports = mongoose.model("HousecutPercentage", HousecutPercentageSchema);
