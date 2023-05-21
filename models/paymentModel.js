const mongoose = require("mongoose");

const payment = new mongoose.Schema(
    {
        // accountNumber: {
        //     type: Number,
        //     required: true,
        // },
        // account_holder_name: {
        //     type: String,
        //     required: true,
        // },
        // account_holder_type: {
        //     type: String,
        //     required: true,
        // },
        // bank_name: {
        //     type: String,
        //     required: true,
        // },
        status: {
            type: String,
            enum: ["PENDING", "SUCCESS", "PROCESS","FAILED"],
            default: "PENDING",
        },
        email: {
            type: String,
        },
        amount: {
            type: Number,
        },
        userId: {
            type: String,
        },
        batchid:{
            type:String
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("payment", payment);
