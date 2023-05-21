const mongoose = require("mongoose");

const plyawithfriendSchema = new mongoose.Schema(
  {
    tournament_name: {
      type: String,
    },
    tournamentId: {
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
        isgameStarted: {
          type: String,
          default: false,
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
    tournamentdata: [
      {
        _id: {
          type: String,
        },
        category: {
          type: String,
        },
        add_word: {
          type: String,
        },
        letter_count: {
          type: String,
        },

      },
    ],
    start_time: {
      type: String,
    },
    mode: {
      type: String
    },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("playwithfriend_randomdata", plyawithfriendSchema);
