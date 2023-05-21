const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tournamentmodelSchema = new mongoose.Schema(
  {
    tournamentName: {
      type: String,
    },
    tournament_id: {
      type: Schema.Types.ObjectId,
    },
    UserName: {
      type: String,
    },
    User_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("tournamentJoin", tournamentmodelSchema);
