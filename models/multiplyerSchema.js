const mongoose = require("mongoose");

const multiplyerSchema = new mongoose.Schema(
  {
    room_Id: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    players: [
      {
        userId: {
          type: String,
        },
        email: {
          type: String,
        },
        score: {
          type: String,
        },
        username: {
          type: String,
        },
      },
    ],
    winner: {
      userId: {
        type: String,
      },
      email: {
        type: String,
      },
      coins: {
        type: String,
      },
    },
    start_time: {
      type: String,
    },
    mode: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("multipley", multiplyerSchema);
