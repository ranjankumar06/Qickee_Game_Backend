const mongoose = require('mongoose')


const tournamentSchema = new mongoose.Schema({
  tournamentname: {
    type: String
  },
  tournamentId: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  players: [{
    userId: {
      type: String
    },
    email: {
      type: String
    },
    timing: {
      type: String
    },
    username: {
      type: String
    },
    score: {
      type: String
    },
    isgameStarted: {
      type: String,
      default: false
    },
  }],
  winner: {
    userId: {
      type: String
    },
    email: {
      type: String
    },
    coins: {
      type: String
    }
  },
  tournamentdata: [{
    _id: {
      type: String
    },
    category: {
      type: String
    },
    word: {
      type: String
    },
    songlinks: {
      type: String
    },
    extrahint: {
      type: String
    }
  }],
  IsBonousround: {
    type: String,
    default: false
  },
  start_time: {
    type: String
  },
  mode: {
    type: String
  }

}, { timestamps: true, versionKey: false })
module.exports = mongoose.model('tournament_randomdata', tournamentSchema)  