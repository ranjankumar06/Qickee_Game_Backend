const mongoose = require("mongoose");

const bankstatement = new mongoose.Schema(
    {
        date: {
            type: String,
        },
        tital: {
            type: String,
        },
        withdrawals: {
            type: Number,
        },
        deposits: {
            type: String,
        },
        amount: {
            type: Number,
        },
        userId: {
            type: String,
        },
        comment: {
            type: String,
        },
        status: {
            type: String,
            default: "PENDING"
        },
        beatchidpaypal: {
            type: String,
        },

    },
    { timestamps: true }
);
module.exports = mongoose.model("bankstatement", bankstatement);
