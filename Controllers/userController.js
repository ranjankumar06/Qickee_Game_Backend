const User = require("../models/userSchema");
const Profile = require("../models/userProfileSchema");
const User1 = require("../models/userSchema");
const Transaction = require("../models/transactionSchema");
const UserTransaction = require("../models/walletSchema");
const getTransactionhistory = require("../models/transactionSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../otpCode/uniqcode");
const auth = require("../middleware/auth").authCustomer;
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const usertransaction = require("../models/ledgerSchema");
const walletModel = require("../models/transactionSchema");
const Deleteuser = require("../models/userSchema");
const Basetournament = require("../models/tournamentmodel");
const Tournament = require("../models/main_tournamentmodel");
const leaderboard = require("../models/leaderBoard");
const RamdomFriend = require("../models/playwithfriendSchema");
const tournament = require("../models/playwithfriendSchema");
const getWallet_User = require("../models/walletSchema");
const UserwalletModel = require("../models/walletSchema");
const userSchema = require("../models/userSchema");
const walletSchema = require("../models/walletSchema");
const playwithfriendSchema = require("../models/playwithfriendSchema");
const ledgerSchema = require("../models/ledgerSchema");
const transactionSchema = require("../models/transactionSchema");
const multipley_create = require("../models/multiplyerSchema");
const multiplyerSchema = require("../models/multiplyerSchema");
const bankstatement = require("../models/bankStatements");
const batchid = require("../models/userBatchId")
const userbankdetails = require('../models/paymentModel')

const { profile, log } = require("console");

exports.signup = async (req, resp) => {
  console.log("req", resp);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      const user = new User();
      (user.email = email), (user.password = password), await user.save();
      const result = await user.save();
      const token = await jwt.sign({ _id: result._id }, "this is my", {
        expiresIn: "1d",
      });
      resp.send({ success: true, message: "user registered", token });
    } else {
      resp.send({ success: false, message: "email already registered" });
    }
  } catch (e) {
    console.log(e);
    resp.send(e);
  }
};

exports.sendotp = async (req, resp) => {
  try {
    const { email } = req.body;
    const code = generateOTP(4);
    const datacode = await User.findOne({ email: email });
    if (datacode) {
      const datcode = await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            otp: code,
          },
        }
      );

      if (datcode) {
        let mailTransporter = nodemailer.createTransport({
          service: "Gmail",
          port: 587,
          secure: false,
          auth: {
            user: "mailto:rajendrakashyap7302598@gmail.com",
            pass: "dalvmksongilcvjr",
          },
        });

        let mailDetails = {
          from: "mailto:rajendrakashyap7302598@gmail.com",
          to: email,
          subject: "To verified your Email",
          html: `
                  <h2>Greetings!</h2>
                        Thank you for choosing  use the following one-Time Password(OTP) to
                        complete your varification.
                         <h3>${code}</h3>
                         <h4>Regards</h4>
                         Ethan`,
        };

        mailTransporter.sendMail(mailDetails, function (err, datacode) {
          if (err) {
            console.log(err);
            console.log("error eccours");
          } else {
            console.log("email sent");
            resp.send({
              success: true,
              message: "email sent successfully",
              otp: code,
            });
          }
        });
      }
    } else {
      resp.send({ success: false, message: "email not exist" });
    }
    console.log();
  } catch (err) {
    console.log(err);
    resp.send(err);
  }
};

exports.email_verify = async (req, res) => {
  try {
    const { OTP, email } = req.body;
    const data = await User.find({ otp: OTP, email: email });
    if (data) {
      const datacode = await User.findOneAndUpdate(
        { otp: OTP, email: email },
        { $set: { verified: true } },
        { new: true }
      );
      res.send({ success: true, message: "email verified" });
    } else {
      res.send({ success: false, message: "email not verified" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.login = async (req, res) => {
  try {
    // const { email, password } = req.body;
    // const user = await User.findOne({
    //   email: email,
    // });
    // if (user.is_delete) {
    //   return res.send({ success: true, message: "user is not exist" });
    // }

    // if (user) {
    //   if (user.password === password) {
    //     const user = await User.findOne(
    //       {
    //         email: email,
    //       },
    //       { password: 0 }
    //     ).select({
    //       otp: 0,
    //     });
    //     const token = await jwt.sign({ _id: user._id }, "this is my", {
    //       expiresIn: "1d",
    //     });
    //     res.send({ success: true, user: user, token });
    //   } else {
    //     res.send({ success: false, message: "password not matched" });
    //   }
    // } else {
    //   res.send({ success: false, message: "email not matched" });
    // }
    const { email, password } = req.body;
    const data = await User.findOne({
      email: email,
    });
    if (data) {
      if (data.password === password) {
        const serachuser = await User.findOne(
          {
            email: email,
          },
          { password: 0 }
        );
        const token = await jwt.sign({ _id: data._id }, "this is my", {
          expiresIn: "1d",
        });
        res.send({ success: true, user: serachuser, token });
      } else {
        res.send({ success: false, Message: "password not matched" });
      }
    } else {
      res.send({ success: false, Message: "email not matched" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.get_users = async (req, res) => {
  try {
    const user = await User.find().select({
      otp: 0,
    });
    if (!user) {
      return res
        .status(404)
        .json({ status: "success", message: "No document found!" });
    }
    res.send({ result: user });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.getone_user = async (req, res) => {
  const user = req.user;
  try {
    const id = user._id;
    const data = await User.findOne({ _id: id });
    if (data) {
      res.send({ result: data });
    } else {
      res.send({ success: false, message: "user not exist" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.Add_userProfile = async (req, res) => {
  try {
    // const user = req.user;
    // const id = user._id;
    // console.log(id);
    // const { username, avatar, coins } = req.body;
    // const dat = await Profile.findOne({ username: username });
    // if (!dat) {
    //   const data = await User1.findOne({ userId: id });
    //   console.log(data);
    //   if (data) {
    //     const result = await User1.findOneAndUpdate(
    //       { userId: id },
    //       req.body,
    //       { new: true }
    //     );
    //     res.send({
    //       success: true,
    //       Message: "user profile is updated",
    //       profile: result,
    //     });
    //   } else {
    //     const data = User1({
    //       username: username,
    //       avatar: avatar,
    //       coins: coins,
    //       userId: id,
    //     });
    //     const result = await data.save();
    //     res.send({
    //       success: true,
    //       Message: "user profile registered",
    //       profile: result,
    //     });
    //   }
    // } else {
    //   res.send({ success: false, msg: "username already registered" });
    // }
    const user = req.user;
    const id = user._id;
    const { username, avatar, coins } = req.body;
    const dat = await Profile.findOne({ username: username });
    if (!dat) {
      const data = await Profile.findOne({ userId: id });
      if (data) {
        const result = await Profile.findOneAndUpdate(
          { userId: id },
          req.body,
          { new: true }
        );
        res.send({
          success: true,
          Message: "user profile is updated",
          profile: result,
        });
      } else {
        const data = Profile({
          username: username,
          avatar: avatar,
          coins: 5,
          userId: id,
        });
        const result = await data.save();
        res.send({
          success: true,
          Message: "user profile registered",
          profile: result,
        });
      }
    } else {
      res.send({ success: false, msg: "username already registered" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
exports.getUser_profile = async (req, res) => {
  try {
    let user = req.user;
    let id = user._id;
    const data = await Profile.find({ userId: id });
    if (data) {
      res.send({ success: true, profile: data });
    } else {
      res.send({ success: false, Message: "profile null", profile: null });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.update_coins = async (req, res) => {
  try {
    const user = req.user;
    const id = user._id;
    const { coins } = req.body;
    const data = await Profile.findOneAndUpdate(
      { userId: id },
      {
        $set: {
          coins: coins,
        },
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        success: true,
        massage: "user Profile not Exist",
        profile: null,
      });
    }

    res
      .status(200)
      .json({ success: true, massage: "coins update", Profile: data });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findOne({
      otp: otp,
      otpExpiresIn: { $gt: Date.now() },
    });
    console.log("user", user);
    if (!user) {
      return res.status(400).json({ message: "Otp is invalid or has expired" });
    }
    user.password = req.body.password;
    user.otpExpiresIn = undefined;
    user.otp = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password changed successfully.",
    });
  } catch (err) {
    console.log("Error", err);
  }
};

exports.forgetpasswordsendotp = async (req, resp) => {
  try {
    const { email } = req.body;
    const code = generateOTP(4);
    const datacode = await User.findOne({ email: email });
    if (datacode) {
      const datcode = await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            otp: code,
            otpExpiresIn: Date.now() + 10 * 60 * 1000,
          },
        }
      );

      if (datcode) {
        let mailTransporter = nodemailer.createTransport({
          service: "Gmail",
          port: 587,
          secure: false,
          auth: {
            user: "rajendrakashyap7302598@gmail.com",
            pass: "dalvmksongilcvjr",
          },
        });

        let mailDetails = {
          from: "rajendrakashyap7302598@gmail.com",
          to: email,
          subject: "To verified your Email",
          html: `
                  <h2>Greetings!</h2>
                        Thank you for choosing  use the following one-Time Password(OTP) to
                        complete your varification.
                         <h3>${code}</h3>
                         <h4>Regards</h4>
                         Ethan`,
        };

        mailTransporter.sendMail(mailDetails, function (err, datacode) {
          if (err) {
            console.log(err);
            console.log("error eccours");
          } else {
            console.log("email sent");
            resp.send({
              success: true,
              message: "email sent successfully",
              otp: code,
            });
          }
        });
      }
    } else {
      resp.send({ success: false, message: "email not exist" });
    }
    console.log();
  } catch (err) {
    console.log(err);
    resp.send(err);
  }
};

exports.wallet = async (req, res) => {
  const id = req.user._id;
  const { amount, reason } = req.body;
  try {
    const wallet = await Transaction.findOne({ userid: id });
    console.log(wallet);
    if (!wallet) {
      await Transaction.create({
        userid: id,
        amount: amount,
        reason: reason,
      });
      console.log(wallet);
      res.send({
        success: true,
        message: "user Transaction successfull",
      });
    } else {
      wallet.amount = amount;
      await wallet.save();
      res.send({
        success: true,
        message: "user Transaction Updated..",
      });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};



exports.checkwallet = async (req, res) => {

  try {
    const id = req.user._id;
    const wallet = await Transaction.findOne({ userid: id });
    if (wallet.amount <= 0) {
      res.send({
        success: false,
        message: "first you can add money in your wallet",
      });
    }
    else {
      res.send({
        success: true,
      });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.getwallet = async (req, res) => {
  try {
    const user = req.user._id;
    const getAlltransaction = await getTransactionhistory.findOne({
      userid: user,
    });
    console.log("userDetail", getAlltransaction);
    res.status(200).json({
      success: true,
      message: "success",
      game_mode: getAlltransaction,
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.Userledger = async (req, resp) => {
  try {
    const userId = req.user._id;
    const { transaction_amount } = req.body;
    if (!transaction_amount) {
      return resp
        .status(400)
        .json({ success: false, message: "All feilds are required !" });
    }
    const user = await walletModel.findOne({ userid: userId });
    if (!user) {
      const userWallet = await walletModel.create({
        userid: userId,
        amount: transaction_amount,
      });
    } else {
      const totalAmount = user.amount + transaction_amount;
      const userWallet = await walletModel.findOneAndUpdate(
        {
          userid: userId,
        },
        {
          $set: {
            amount: totalAmount,
          },
        }
      );
    }
    const userLedger = await usertransaction.create({
      userid: userId,
      transaction_amount: transaction_amount,
      reason: "coin",
    });
    return resp.status(200).json({
      success: true,
      message: "User ledger saved successfully !",
      ledger: userLedger,
    });
  } catch (err) {
    console.log(err);
    return resp
      .status(400)
      .json({ success: false, message: "Somthing went wrong !" });
  }
};

exports.getOneuser = async (req, res) => {
  try {
    const userdata = await User.findOne({ _id: req.body._id });

    res.status(200).json({
      message: "success",
      result: userdata,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Somthing went wrong !" });
  }
};

exports.delUser = async (req, res) => {
  const user = req.user;
  const id = user._id;
  console.log(id);
  try {
    const userdata = await User.findOne({
      $and: [{ _id: id }, { is_deleted: false }],
    });
    if (userdata) {
      const deleted = await User.findOneAndUpdate(
        { $and: [{ _id: id }, { is_deleted: false }] },
        {
          $set: {
            is_deleted: true,
          },
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "User deleted successfully !",
        result: deleted,
      });
    } else {
      res.status(200).json({ success: true, message: "User not found !" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Somthing went wrong !" });
  }
};

(exports.checkUsername = async (req, resp) => {
  try {
    const userdata = await Profile.findOne({ username: req.body.username });
    if (userdata) {
      resp.status(200).json({ success: true, message: "Username exist" });
    } else {
      resp
        .status(400)
        .json({ success: false, message: "Username does not exist" });
    }
  } catch (e) {
    console.log(e);
    resp.send(e);
  }
}),

  (exports.create_basetournament = async (req, res) => {
    try {
      const { tournamentname, price, start_time, mode } = req.body;
      const randomId = generateOTP(8);
      const baseTourn=await Basetournament.findOne({mode:req.body.mode})
      if(baseTourn){
        res.send({success: false,Message: "tournament already created",Tournament: baseTourn,
        });
      }
      else{
      const data = await Basetournament({
        tournamentname: tournamentname,
        price: price,
        start_time: start_time,
        mode: mode,
      });
      
      const result = await data.save();
      res.send({
        success: true,
        Message: "tournament register",
        Tournament: result,
      });
    }
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  }),
  (exports.get_Alltournament = async (req, res) => {
    try {
      const data = await Tournament.find();
      res.send({ Tournament: data });
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  }),

  (exports.get_Leaderboard = async (req, res) => {
    try {
      const data = await leaderboard.find()
      res.send({ Leaderboard: data });
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  }),
  (exports.get_Allbasetournament = async (req, res) => {
    try {
      const data = await Basetournament.findOne({});
      res.send({ success: true, Basetournament: data });
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  }),
  (exports.add_tournamentdata = async (req, res) => {
    try {
      const { category, word, extrahint, mode } = req.body;
      const data = await Basetournament.findOne({ mode: mode });
      console.log(data);
      if (data) {
        if (mode === "1" && word.length == 4) {
          const song = await Basetournament.findOneAndUpdate(
            { mode: mode },
            {
              $push: {
                tournamentdata: {
                  _id: data.tournamentdata.length,
                  category: category,
                  word: word,
                  extrahint: extrahint,
                },
              },
            },
            { new: true }
          );
          res.send({
            success: true,
            Message: "Easy tournament data is added",
            Tournament: song,
          });
        } else if (mode === "2" && word.length == 5) {
          const song = await Basetournament.findOneAndUpdate(
            { mode: mode },
            {
              $push: {
                tournamentdata: {
                  _id: data.tournamentdata.length,
                  category: category,
                  word: word,
                  // songlinks:req.file.filename,
                  extrahint: extrahint,
                },
              },
            },
            { new: true }
          );
          res.send({
            success: true,
            Message: " Meadium tournament data is added",
            Tournament: song,
          });
        } else if (mode === "3" && (word.length == 6 || word.length == 7)) {
          const song = await Basetournament.findOneAndUpdate(
            { mode: mode },
            {
              $push: {
                tournamentdata: {
                  _id: data.tournamentdata.length,
                  category: category,
                  word: word,
                  // songlinks:req.file.filename,
                  extrahint: extrahint,
                },
              },
            },
            { new: true }
          );
          res.send({
            success: true,
            Message: " hard tournament data is added",
            Tournament: song,
          });
        } else {
          res.send({
            success: false,
            msg: "use proper word length for easy use 4 word and for medium use 5 or for hard use 6 or 7 random",
          });
        }
      } else {
        res.send({
          success: false,
          Message: "tournament not exist",
          Tournament: null,
        });
      }
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  }),
  (exports.join_tournament = async (req, res) => {
    try {
      const user = req.user;
      const id = user._id;
      console.log(id);
      var d = new Date();
      console.log(d);
      const time = d.toString();

      console.log(time.slice(16, 25));
      const str1 = time.slice(16, 25);
      const str2 = "10:00:00";
      // if(str1>=str2){
      const { tournamentId } = req.body;

      const data = await Tournament.findOne({
        tournamentId: tournamentId,
      });

      const leaderdata = await leaderboard.findOne({
        tournamentId: tournamentId,
      });

      const userdata = await User.findOne({ _id: id });

      if (data) {
        const dat = await Profile.findOne({ userId: id });

        if (dat.coins > data.price) {
          const searchuser = await Tournament.findOne({
            tournamentId: tournamentId,
            players: { $elemMatch: { userId: id } },
          });

          const leadersearchuser = await leaderboard.findOne({
            tournamentId: tournamentId,
            players: { $elemMatch: { userId: id } },
          });

          if (!searchuser) {
            const result = await Tournament.findOneAndUpdate(
              { tournamentId: tournamentId },
              {
                $push: {
                  players: {
                    userId: id,
                    email: userdata.email,
                    username: dat.username,
                    score: dat.score,
                  },
                },
              },
              { new: true }
            );

            const leadeRresult = await leaderboard.findOneAndUpdate(
              { tournamentId: tournamentId },
              {
                $push: {
                  players: {
                    userId: id,
                    email: userdata.email,
                    username: dat.username,
                    score: dat.score,
                  },
                },
              },
              { new: true }
            );

            res.send({ success: true, Message: "user joined" });
          } else {
            res.send({ success: false, Message: "user already registered" });
          }
        } else {
          res.send({
            success: false,
            Message: "you don't have enough balance",
          });
        }
      } else {
        res.send({ success: false, Message: "tournament not exist" });
      }
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  });
exports.create_testtournament = async (req, res) => {
  try {
    const { mode } = req.body;
    const create = await Basetournament.findOne({ mode: mode });
    // console.log(create);
    const item = create.tournamentdata.length;
    // console.log(item);
    if (item > 10) {
      function getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());

        return shuffled.slice(0, num);
      }
      const arr = create.tournamentdata;
      const array = getMultipleRandom(arr, 10);
      // console.log(array);
      // var item = create[0].tournamentdata[Math.floor(Math.random()*create[0].tournamentdata.length)];
      // console.log(item);
      const randomId = generateOTP(8);
      const data = await Tournament({
        tournamentname: create.tournamentname,
        price: create.price,
        tournamentId: randomId,
        tournamentdata: array,
        IsBonousround: create.IsBonousround,
        start_time: create.start_time,
        mode: create.mode,
      });

      const board = await leaderboard({
        tournamentname: create.tournamentname,
        price: create.price,
        tournamentId: randomId,
        tournamentdata: array,
        IsBonousround: create.IsBonousround,
        start_time: create.start_time,
        mode: create.mode,
      });
      const result = await data.save();
      const leaderresult = await board.save();

      console.log(result);
      //    console.log("tournament created successfully");
      res.send({ success: true, msg: "test tournament created" });
    } else {
      const randomId = generateOTP(8);
      const data = await Tournament({
        tournamentname: create.tournamentname,
        price: create.price,
        tournamentId: randomId,
        tournamentdata: create.tournamentdata,
        IsBonousround: create.IsBonousround,
        start_time: create.start_time,
        mode: create.mode,
      });

      const board = await leaderboard({
        tournamentname: create.tournamentname,
        price: create.price,
        tournamentId: randomId,
        tournamentdata: create.tournamentdata,
        IsBonousround: create.IsBonousround,
        start_time: create.start_time,
        mode: create.mode,
      });
      const leaderresult = await board.save();
      const result = await data.save();
      res.send({ success: true, msg: "test tournament created" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
exports.get_tournament = async (req, res) => {
  try {
    const { mode } = req.body;
    const data = await Tournament.find({ mode: mode });
    res.send({ Tournament: data });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
exports.get_basetournament = async (req, res) => {
  try {
    const { mode } = req.body;
    const data = await Basetournament.find({ mode: mode });
    res.send({ success: true, Basetournament: data });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
exports.update_tournament = async (req, res) => {
  try {
    const { tournamentname, price, IsBonousround, start_time, mode } = req.body;
    const data = await Basetournament.findOne({ mode: mode });
    console.log(data);
    if (data) {
      const result = await Basetournament.findOneAndUpdate(
        { mode: mode },
        {
          $set: {
            tournamentname: tournamentname,
            price: price,
            IsBonousround: IsBonousround,
            start_time: start_time,
          },
        },
        { new: true }
      );
      res.send({
        success: true,
        Message: "tournament is updated",
        Tournament: result,
      });
    } else {
      res.send({
        success: false,
        Message: "tournament not exist",
        Tournament: null,
      });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
exports.update_tournamentdata = async (req, res) => {
  try {
    const { category, word, extrahint, _id, mode } = req.body;
    const data = await Basetournament.findOne({ mode: mode });
    if (data) {
      if (data.tournamentdata) {
        var arraydata = [];
        data.tournamentdata.forEach((element) => {
          arraydata.push(element);
        });
        var user = arraydata.find((s) => s._id == _id);
        if (user) {
          arraydata.forEach((inneruser) => {
            if (inneruser._id == _id) {
              (inneruser.category = category),
                (inneruser.word = word),
                (inneruser.extrahint = extrahint);
              // inneruser.songlinks=req.file.filename
            }
          });
          const update = await Basetournament.findOneAndUpdate(
            {},
            {
              $set: {
                tournamentdata: arraydata,
              },
            },
            { new: true }
          );
          res.send({
            success: true,
            Message: "tournament is updated",
            Tournament: update,
          });
        }
      }
    } else {
      res.send({
        success: false,
        Message: "tournament not exist",
        Tournament: null,
      });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
exports.delete_tournament = async (req, res) => {
  try {
    const { tournamentId } = req.body;
    const data = await Tournament.findOneAndDelete({
      tournamentId: tournamentId,
    });
    if (data) {
      res.send({ success: true, Message: "tournament deleted" });
    } else {
      res.send({ success: false, Message: "tournament not exist" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.create_tournament1 = async (req, res) => {
  try {
    const { tournament_name, tournamentId, price, start_time, mode } = req.body;
    const randomId = generateOTP(8);
    const data = await RamdomFriend.create({
      tournament_name: tournament_name,
      tournamentId: randomId,
      price: price,
      start_time: start_time,
      mode: mode,
    });
    const result = await data.save();
    res.status(200).json({
      success: true,
      message: "Tournament Create the User",
      result: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: " invalide request" });
  }
};

exports.add_tournamentdata2 = async (req, res) => {
  try {
    const { tournamentId, category, add_word, letter_count } = req.body;
    const data = await playwithfriendSchema.findOne({});
    console.log(data);
    if (data) {
      const result = await playwithfriendSchema.findOneAndUpdate(
        {},
        {
          $push: {
            tournamentdata: {
              tournamentId: tournamentId,
              category: category,
              add_word: add_word,
              letter_count: letter_count,
            },
          },
        },
        { new: true }
      );
      res.status(400).json({
        success: true,
        Message: "tournament data is added",
        Tournament: result,
      });
    } else {
      res.status(400).json({
        success: false,
        Message: "tournament not exist",
        Tournament: null,
      });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
exports.join_tournament3 = async (req, res) => {
  try {
    const authUser = req.user;
    const reqBody = req.body;
    const { tournamentId } = reqBody;
    const getTournament = await playwithfriendSchema.findOne({
      tournamentId: tournamentId,
    });
    const user = await userSchema.findOne({ _id: authUser });
    const userWallet = await walletSchema.findOne({ userid: authUser });
    const getTournamentData = await playwithfriendSchema.findOne({
      tournamentId: tournamentId,
    });
    const searchuser = await playwithfriendSchema.findOne({
      $and: [
        { tournamentId: tournamentId },
        { players: { $elemMatch: { userId: authUser } } },
      ],
    });
    // console.log("user....", searchuser);
    if (!getTournamentData) {
      res.status(400).json({
        success: false,
        message: "This tournament is not available !",
      });
    } else if (userWallet.currency < getTournament.price) {
      res.status(400).json({
        success: false,
        message: "User do not have suffiecient amount !",
      });
    } else if (searchuser != null) {
      res.status(400).json({
        success: true,
        message: "User already joined the tournament !",
      });
    } else if (searchuser == null) {
      const result = await playwithfriendSchema.findOneAndUpdate(
        { tournamentId: tournamentId },
        {
          $push: {
            players: {
              userId: authUser,
            },
          },
        },
        { new: true }
      );
      const updateUserWallet = await walletSchema.findOneAndUpdate(
        { userid: authUser },
        {
          $set: {
            currency: userWallet.currency - getTournament.price,
          },
        }
      );

      const updateTransaction = await transactionSchema.create({
        userid: authUser,
        amount: getTournament.price,
        reason: "Join random torunament",
        type: "Debit",
      });
      res.status(200).json({ success: true, Message: "user joined" });
    }
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: err.message });
  }
};

exports.add_winner = async (req, res) => {
  try {
    const user = req.user;
    const id = user._id;
    const { tournamentId } = req.body;
    const data = await Tournament.findOne({ tournamentId: tournamentId });
    const userdata = await User.findOne({ _id: id });
    const profile = await Profile.findOne({ userId: id });
    if (data) {
      console.log(profile);

      const winner = await Tournament.findOneAndUpdate(
        { tournamentId: tournamentId },
        {
          $set: {
            winner: {
              userId: id,
              email: userdata.email,
              username: profile.username,
              score: profile.score,
              coins: profile.coins,

            },
          },
        }
      );

      const leaderwinner = await leaderboard.findOneAndUpdate(
        { tournamentId: tournamentId },
        {
          $set: {
            winner: {
              userId: id,
              email: userdata.email,
              username: profile.username,
              score: profile.score,
              coins: profile.coins,

            },
          },
        }
      );
      res.status(400).json({
        success: true,
        Message: "winner registered",
        tournament: winner,
      });
    } else {
      res.status(400).json({ success: false, Message: "tournament not exist" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, Message: "invalid request" });
  }
};
////////////////////////////////////////////////////////////////////////////////////

exports.createUserWallet = async (req, res) => {
  try {
    const authUser = req.user;
    const reqBody = req.body;
    const { currency } = reqBody;
    if (!currency) {
      res
        .status(400)
        .json({ success: false, message: "Allfilds are mandatory !" });
    }
    const userWallet = await walletSchema.findOne({ userid: authUser });
    if (!userWallet) {
      const createWallet = await walletSchema.create({
        userid: authUser,
        currency: currency,
      });

      const userLedger = await transactionSchema.create({
        userid: authUser,
        amount: currency,
        reason: "wallet",
        type: "Credit",
      });
      res.status(200).json({
        success: true,
        message: "User wallet created successfully !",
        user_wallet: createWallet,
      });
    } else {
      const updateUserWallet = await walletSchema.findOneAndUpdate(
        { userid: authUser },
        {
          $set: {
            currency: Number(userWallet.currency) + Number(currency),
          },
        },
        { new: true }
      );

      const userLedger = await transactionSchema.create({
        userid: authUser,
        amount: currency,
        reason: "wallet",
        type: "Credit",
      });

      res.status(200).json({
        success: true,
        message: "User wallet Updated successfully !",
        user_wallet: updateUserWallet,
      });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.Userwallet = async (req, res) => {
  try {
    const authUser = req.user;
    const wallet = await walletSchema.findOne({ userid: authUser });
    if (!wallet) {
      res
        .status(400)
        .json({ success: false, message: "User wallet not available !" });
    } else {
      res.status(200).json({
        success: true,
        message: " User wallet !",
        user_wallet: wallet,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.User_Get_All_Tournament = async (req, res) => {
  try {
    const data = await playwithfriendSchema.find();
    res.send({ playwithfriendSchema: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "invalide request!" });
  }
};

exports.delete_Tournament = async (req, res) => {
  try {
    const { tournamentId } = req.body;
    const data = await Tournament.findOneAndDelete({
      tournamentId: tournamentId,
    });
    if (data) {
      res.send({ success: true, Message: "tournament deleted" });
    } else {
      res.send({ success: false, Message: "tournament not exist" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.get_User_Leader = async (req, res) => {
  const user = req.user;
  try {
    const _id = user.id;
    const data = await ledgerSchema.findOne({ id: _id });
    if (data) {
      res.status(400).json({
        success: true,
        message: "Leader User Get Successfull...",
        result: data,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Leader User Not Found..." });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Invalide Request" });
  }
};

exports.create_multipleayer = async (req, res) => {
  const id = req.user._id;
  try {
    const { room_Id, price } = req.body;
    const Userdata = await User.findOne({ _id: id });
    const searchprofile = await Profile.findOne({ userId: id });
    console.log(searchprofile);
    const data = await multipley_create({
      room_Id: room_Id,
      price: price,
      players: {
        email: Userdata.email,
        username: searchprofile.username,
        score: searchprofile.score,
        userId: searchprofile.userId,
      },
    });
    const result = await data.save();
    res.status(200).json({
      success: true,
      Message: "tournament register",
      multipley: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Invalide Request" });
  }
};

exports.join_Multiplyer = async (req, res) => {
  const id = req.user._id;
  try {
    const { room_Id } = req.body;
    const data = await multiplyerSchema.findOne({
      room_Id: room_Id,
    });
    const user = await User.findOne({ _id: id });
    console.log(data);
    if (data) {
      const profile = await Profile.findOne({ userId: id });
      if (profile.coins > data.price) {
        const searchuser = await multiplyerSchema.findOne({
          room_Id: room_Id,
          players: { $elemMatch: { userId: id } },
        });
        if (!searchuser) {
          const result = await multiplyerSchema.findOneAndUpdate(
            { room_Id: room_Id },
            {
              $push: {
                players: {
                  email: user.email,
                  username: profile.username,
                  score: profile.score,
                  userId: profile.userId,
                },
              },
            },
            { new: true }
          );
          res.send({ success: true, Message: "User joined", result: result });
        } else {
          res.send({ success: false, massage: "user already registered" });
        }
      } else {
        res.send({ success: false, message: "you don,t have enough balance" });
      }
    } else {
      res.send({ success: false, message: "room not exit" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Invalide Request" });
  }
};

exports.winner_Multiplyer = async (req, res) => {
  const user = req.user;
  const id = user._id;
  try {
    const { room_Id } = req.body;
    const data = await multiplyerSchema.findOne({ room_Id: room_Id });
    const userdata = await User.findOne({ _id: id });
    console.log(userdata);
    const profile = await Profile.findOne({ userId: id });
    if (data) {
      const winner = await multiplyerSchema.findOneAndUpdate(
        { room_Id: room_Id },
        {
          $set: {
            winner: {
              userId: id,
              email: userdata.email,
              coins: profile.coins,
              score: profile.score,
            },
          },
        }
      );
      res.status(200).json({
        success: true,
        Message: "winner registered",
        multiplyerSchema: winner,
      });
    } else {
      res.status(400).json({ success: false, Message: "Multiplyer not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, Message: "invalid request" });
  }
};

exports.get_One_room = async (req, res) => {
  const user = req.user;
  try {
    const room_Id = user._room_Id;
    const data = await multiplyerSchema.findOne({ _room_Id: room_Id });
    if (data) {
      res
        .status(200)
        .json({ success: true, message: "Room is find", result: data });
    } else {
      res.status(400).json({ success: false, message: "Room not find" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, Message: "invalid request" });
  }
};





exports.update_score = async (req, res) => {
  try {
    const user = req.user;
    const id = user._id;
    const { score } = req.body;
    console.log(id);
    const data = await Profile.findOneAndUpdate(
      { userId: id },
      {
        $set: {
          score: score,
        },
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        success: true,
        massage: "user Profile not Exist",
        profile: null,
      });
    }

    res
      .status(200)
      .json({ success: true, massage: "score updated successfully", Profile: data });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}


exports.update_tonument_score = async (req, res) => {
  try {
    const da = req.user
    const _id = da._id
    console.log(_id);
    const { tournamentId, score } = req.body
    const data = await Tournament.findOne({ tournamentId: tournamentId })
    if (data) {
      if (data.players) {
        var arraydata = []
        data.players.forEach(element => {
          arraydata.push(element)
        })
        var user = arraydata.find(s => s.userId == _id)
        if (user) {
          arraydata.forEach(inneruser => {
            if (inneruser.userId == _id) {
              inneruser.score = score
            }
          });
          const update = await Tournament.findOneAndUpdate({ tournamentId: tournamentId }, {
            $set: {
              "players": arraydata
            }
          }, { new: true })
          const profile = await Profile.findOneAndUpdate({ userId: _id }, {
            $set: {
              score: score
            }
          }, { new: true })
          res.send({ success: true, Message: "score is updated" })
        }
      }
    } else {
      res.send({ success: false, msg: "tournament is not exist" })
    }
  } catch (e) {
    console.log(e);
    res.send(e)
  }
}




exports.bankstatements = async (req, res) => {
  try {
    const id = req.user._id;
    console.log(id);
    const user = await User.findOne({ _id: id });
    if (user) {
      // const wallet = await Transaction.findOne({ userid: id });
      // const userfind = await userbankdetails.findOne({ userId: id })
      // const userprofile = await Profile.findOne({ userId: id });
      // let aaa=  wallet.amount- userfind.amount 
      // const data = await Transaction.findOneAndUpdate(
      //   { userid: id },
      //   {
      //     $set: {
      //       amount: aaa,
      //     },
      //   },
      //   { new: true }
      // );

      const account = await bankstatement.create({
        date: req.body.date,
        tital: req.body.tital,
        amount: req.body.amount,
        userId: user._id,
      });
      if (account) {
        res.status(200).json({
          success: true,
          message: "bank statements save  successfully !",
          result: account,
        });
      }
    }
    else {
      res.status(400).json({ success: false, message: "user not exits" })
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "invalide request!" });
  }
}


exports.oneuserstatements = async (req, res) => {

  try {
    const id = req.user._id;
    const statement = await bankstatement.find({ userId: id });
    if (statement) {
      res.send({
        success: true,
        message: "user bank statement get successfully !",
        result: statement
      });
    }
    else {
      res.send({
        success: false,
        message: "user not exits !",
      });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.update_status = async (req, res) => {
  try {
    const user = req.user;
    const id = user._id;
    const { status, comment } = req.body;
    const data = await bankstatement.findOneAndUpdate(
      { userId: id },
      {
        $set: {
          status: status,
          comment: comment
        },
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        success: true,
        massage: "user status not Exist",
        profile: null,
      });
    }

    res
      .status(200)
      .json({ success: true, massage: "status update", result: data });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.getbystatus = async (req, res) => {

  try {
    const statementStatus = await bankstatement.find({ status: req.body.status });
    if (statementStatus) {
      res.send({
        success: true,
        message: "user bank statementStatus get successfully !",
        result: statementStatus
      });
    }
    else {
      res.send({
        success: false,
        message: "user not exits !",
      });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.get_Allstatements = async (req, res) => {
  try {
    const data = await bankstatement.find();
    res.send({ result: data });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}

exports.get_All = async (req, res) => {
  try {
    const data = await bankstatement.find({ userId: req.body.userId });
    res.send({ result: data });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}

exports.paybatchid = async (req, res) => {
  try {
    const account = await batchid.create({
      payout_batch_id: req.body.payout_batch_id
    });
    if (account) {
      res.status(200).json({
        success: true,
        message: "Batch id  save  successfully !",
        result: account,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "invalide request!" });
  }
}

exports.delete_user_account = async (req, res) => {
  try {
    const user = req.user;
    const id = user._id;
    const data = await User.findOneAndDelete({
      _id: id,
    });
    if (data) {
      res.send({ success: true, Message: "User account deleted" });
    } else {
      res.send({ success: false, Message: "user not exist" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.update_payPal_id = async (req, res) => {
  try {
    const user = req.user;
    const id = user._id;
    const { payPal_Id } = req.body;
    const data = await Profile.findOneAndUpdate(
      { userId: id },
      {
        $set: {
          payPal_Id: payPal_Id,

        },
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        success: true,
        massage: "user not Exist",
        profile: null,
      });
    }

    res
      .status(200)
      .json({ success: true, massage: "PayPal id save successfully", result: data });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.delete_user = async (req, res) => {
  try {
    const user = req.body._id;
    const data = await userbankdetails.findOneAndDelete({
      _id: user,
    });
    if (data) {
      res.send({ success: true, Message: "User account deleted" });
    } else {
      res.send({ success: false, Message: "user not exist" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.get_All_batchid = async (req, res) => {
  try {
    const data = await batchid.find();
    res.send({ result: data });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}


exports.findWinner = async (req, res) => {
  try {
    const { tournamentId } = req.body
    const data = await Tournament.findOne({ tournamentId: tournamentId })
    if (data) {
      if (data.players) {
        var arraydata = []
        data.players.forEach(element => {
          arraydata.push(element)
        })
        const update = await Tournament.findOne({ tournamentId: tournamentId })
        var first = (arraydata[0].score);
        console.log(arraydata[0]);
        var second = (arraydata[1].score);
        if (first > second) {
          const data = await Tournament.findOneAndUpdate(
            { tournamentId: tournamentId },
            {
              $push: {
                winner: {
                  email: arraydata[0].email,
                  username: arraydata[0].username,
                  score: arraydata[0].score,
                  userId: arraydata[0].userId,
                },
              },
            },
            { new: true }
        );
          res.send({ success: true, Result: "First player is winner", first: arraydata[0] })
        }
        else if (second > first) {
          const data = await Tournament.findOneAndUpdate(
            { tournamentId: tournamentId },
            {
              $push: {
                winner: {
                  email: arraydata[1].email,
                  username: arraydata[1].username,
                  score: arraydata[1].score,
                  userId: arraydata[1].userId,
                },
              },
            },
            { new: true }
        );
          res.send({ success: true, Result: "Second  player is winner", second: arraydata[1] })
        }
        else {
          res.send({ success: true, Result: "Tie", first: arraydata[0], second: arraydata[1] })
        }
      }
    }
  } catch (e) {
    console.log(e);
    res.send(e)
  }
}



exports.delete_room = async (req, res) => {
  try {
    const data = await multipley_create.findOneAndDelete({
      room_Id: req.body.room_Id,
    });
    if (data) {
      res.send({ success: true, Message: "room deleted" });
    } else {
      res.send({ success: false, Message: "room not exist" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};