const modeModel = require("../models/tournamentSchema");
const reqBody = require("../models/tournamentSchema");
const Updatemode = require("../models/tournamentSchema");
const Deletemode = require("../models/tournamentSchema");
const User = require("../models/userSchema");
const walletModel = require("../models/transactionSchema");
const usertransaction = require("../models/ledgerSchema");
const Random = require("../models/tournamentmodel");
const usertournament = require("../models/tournamentmodel");
const usertournamentOne = require("../models/tournamentmodel");
const deleteadminTurnament = require("../models/tournamentmodel");
const Tournamentdata = require("../models/tournament_joinSchema");
const GetAllUserJoinTournament = require("../models/tournament_joinSchema");
const Basetournament = require("../models/tournamentmodel");
const Profile = require("../models/userProfileSchema");

const check = require("../models/tournamentmodel");
const HousecutPercentage = require("../models/Housecutpercentagemodel");
const PercentagemodeUpdate = require("../models/Housecutpercentagemodel");
const userSchema = require("../models/userSchema");
const walletSchema = require("../models/walletSchema");
const tournamentSchema = require("../models/main_tournamentmodel");
const tournamentmainSchema = require("../models/main_tournamentmodel");
const main_tournamentmodel = require("../models/main_tournamentmodel");
const tournamentmodel = require("../models/tournamentmodel");
// const userProfile= require('../models/userProfileSchema')
const userbankdetails = require('../models/paymentModel')
const nodemailer = require("nodemailer");

const userProfile = require("../models/userProfileSchema");
const multiplyerSchema = require("../models/multiplyerSchema");
const bankstatement = require("../models/bankStatements");

var Publishable_Key =
  "pk_test_51N0M2SSC1AuGpZL2dmV9FISbjc2T3fRK7NAigrf7vxyPLkie3q0I7ADwLeAw0UuZiTsw3RbL1Vr3szI1VfzZT67X00G5xiStZO";
var Secret_Key =
  "sk_test_51N0M2SSC1AuGpZL27qzQKE3V8dKoU1aTJKfm15Z5PySmKBmxGTmdjNlDv5GTEj2NckinN0lFhwplsDqmtR1p3JzF00EUNFnHC6";

// var Publishable_Key =
//   "pk_test_51N0M2SSC1AuGpZL2dmV9FISbjc2T3fRK7NAigrf7vxyPLkie3q0I7ADwLeAw0UuZiTsw3RbL1Vr3szI1VfzZT67X00G5xiStZO";
// var Secret_Key =
//   "sk_test_51N0M2SSC1AuGpZL27qzQKE3V8dKoU1aTJKfm15Z5PySmKBmxGTmdjNlDv5GTEj2NckinN0lFhwplsDqmtR1p3JzF00EUNFnHC6";

// const stripe = require("stripe")(Secret_Key);


exports.add_practicemode = async (req, resp) => {
  try {
    const reqBody = req.body;
    const { add_word, category, letter_count, add_Attempts } = reqBody;
    const wordLen = letter_count;

    const regex = /[^a-z]/gi; // only count letters
    const str = add_word;
    const totalWord = str.replace(/[^a-z]/gi, "").length;
    if (totalWord != wordLen) {
      resp.status(400).json({
        success: false,
        message: "Letter count is not equal to Word count !",
      });
    } else if (wordLen < 4 || wordLen > 7) {
      return resp.status(200).json({
        message: "Letter count required minimum 4 and maximum 7",
      });
    } else {
      const creatMode = await modeModel.create({
        add_word: add_word,
        category: category,
        letter_count: letter_count,
        add_Attempts: add_Attempts,
      });
      resp
        .status(200)
        .json({ success: true, message: "success", game_mode: creatMode });
    }
  } catch (e) {
    console.log(e);
    resp.send(e);
  }
};

exports.getAlladmindata = async (req, res) => {
  try {
    const gameData = await reqBody.find();
    res
      .status(200)
      .json({ success: true, message: "success", game_mode: gameData });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.update_practicemode = async (req, res) => {
  try {
    const id = req.body._id;
    const { add_word, category, letter_count, add_Attempts } = req.body;
    const wordLen = letter_count;
    const regex = /[^a-z]/gi; // only count letters
    const str = add_word;
    const totalWord = str.replace(/[^a-z]/gi, "").length;
    if (totalWord != wordLen) {
      res.status(400).json({
        success: false,
        message: "Letter count is not equal to Word count !",
      });
    } else if (wordLen < 4 || wordLen > 7) {
      return res.status(200).json({
        message: "Letter count required minimum 4 and maximum 7",
      });
    } else {
      const data = await Updatemode.findOne({ _id: id });
      console.log(data);
      if (data) {
        const result = await Updatemode.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              add_word: add_word,
              category: category,
              letter_count: letter_count,
              add_Attempts: add_Attempts,
            },
          },
          { new: true }
        );
        res.status(200).json({
          success: true,
          Message: "practice mode updated",
          practicemode: result,
        });
      } else {
        res
          .status(200)
          .json({ success: false, Message: "practice mode not exist" });
      }
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.delete_practicemode = async (req, res) => {
  // const id = req.params.id;
  try {
    const data = await Deletemode.findOneAndDelete({ _id: req.body._id });
    if (data) {
      res.status(200).json({ success: true, message: "practice mode deleted" });
    } else {
      res
        .status(200)
        .json({ success: false, message: "practice mode not exist" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.getAllledgerForAdmin = async (req, res) => {
  try {
    const ledgers = await usertransaction.find();
    if (ledgers) {
      res
        .status(200)
        .json({ success: true, message: "All ledgers", data: ledgers });
    } else {
      res.status(400).json({ success: false, message: "Invalid request" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Invalid request", error: err });
  }
};

exports.getledgerForUser = async (req, res) => {
  // const id = req.params._id;
  try {
    const ledgers = await usertransaction.findOne({ _id: req.body._id });
    if (ledgers) {
      res
        .status(200)
        .json({ success: true, message: "User ledger", data: ledgers });
    } else {
      res.status(400).json({ success: false, message: "Invalid request" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Invalid request", error: err });
  }
};

exports.create_tournament = async (req, res) => {
  try {
    const {
      tournamentname,
      start_time,
      end_time,
      addwords,
      addamount,
      addcategory,
      // addpercentage,
      addmodes,
    } = req.body;
    // var myDate = new Date();
    // var pstDate = myDate.toLocaleString("en-US", {
    //   timeZone: "America/Los_Angeles",
    // });
    // console.log(pstDate);
    const data = await Random.create({
      tournamentname: tournamentname,
      start_time: start_time,
      end_time: end_time,
      addwords: addwords,
      addamount: addamount,
      addcategory: addcategory,
      // addpercentage: addpercentage,
      addmodes: addmodes,
    });
    // console.log(data);
    res.status(200).json({
      success: true,
      message: "tournament register",
      Tournament: data,
    });
  } catch (e) {
    console.log(e);
    res
      .status(200)
      .json({ success: true, message: "get All User Tournament", error: err });
  }
};

exports.AllUserTournament = async (req, res) => {
  try {
    const tournament = await usertournament.find();
    console.log(tournament);
    if (tournament) {
      res
        .status(200)
        .json({ success: true, message: "All ledgers", data: tournament });
    } else {
      res.status(400).json({ success: false, message: "Invalid request" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ success: true, message: "get All User Tournament", error: err });
  }
};

exports.gettournamentadmin = async (req, res) => {
  // const id = req.params._id;
  try {
    const tournament = await usertournamentOne.findOne({ _id: req.body._id });
    if (tournament) {
      res
        .status(200)
        .json({ success: true, message: "User tournament", data: tournament });
    } else {
      res.status(400).json({ success: false, message: "Invalid request" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Invalid request", error: err });
  }
};

exports.deleteTournament = async (req, res) => {
  // const id = req.params._id;
  try {
    const deleted = await deleteadminTurnament.findOneAndUpdate({
      _id: req.body._id,
    });
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully !" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Somthing went wrong !" });
  }
};

exports.join_tournament = async (req, res) => {
  try {
    const { tournamentName, tournament_id, UserName, User_id } = req.body;
    const jointournament = await Tournamentdata.findOne({
      User_id: req.body.User_id,
    });
    if (jointournament) {
      res.status(200).json({
        success: true,
        message: "This User already in This Tournament",
        data: jointournament,
      });
    } else {
      const tournamentdata = await Tournamentdata.create({
        tournamentName: tournamentName,
        tournament_id: tournament_id,
        UserName: UserName,
        User_id: User_id,
      });
      res.status(200).json({
        success: true,
        message: "You are join in tournament Successfully !",
        Tournament: tournamentdata,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Somthing went wrong !" });
  }
};

// exports.payment = async (req, res) => {
//   stripe.customers
//     .create({
//       email: req.body.stripeEmail,
//       source: req.body.stripeToken,
//       name: "ranjan kumar",
//       address: {
//         line1: "TC 9/4 Old MES colony",
//         postal_code: "110092",
//         city: "New Delhi",
//         state: "Delhi",
//         country: "India",
//       },
//     })
//     .then((customer) => {
//       return stripe.charges.create({
//         amount: 7000, // Charing Rs 25
//         description: "Web Development Product",
//         currency: "USD",
//         customer: customer.id,
//       });
//     })
//     .then((charge) => {
//       console.log(charge);
//       res.send("Success"); // If no error occurs
//     })
//     .catch((err) => {
//       res.send(err); // If some error occurs
//     });
// };
exports.getJoinAllTournament = async (req, res) => {
  try {
    const getAllUserTournament = await GetAllUserJoinTournament.find({
      tournament_id: req.body.tournament_id,
    });
    console.log(getAllUserTournament);
    res.status(200).json({
      success: true,
      message: "success",
      game_mode: getAllUserTournament,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Somthing went wrong !" });
  }
};

exports.Admin_login = async (req, res) => {
  try {
    let check = {
      email: "rajendrakashyap7302598@gmail.com",
      password: "Raj@#$123",
    };
    if (
      check.email === req.body.email &&
      check.password === req.body.password
    ) {
      res.status(400).json({
        success: true,
        message: "Email and password is matched Succesfull",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Email and password not matched" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Somthing went wrong !" });
  }
};

exports.Housecut_Percentage = async (req, res) => {
  try {
    const { add_Housepercentagecut } = req.body;
    var result = (2.5 / 100) * add_Housepercentagecut;
    const percentage = await HousecutPercentage.create({
      add_Housepercentagecut: result,
    });
    res.status(200).json({
      success: true,
      message: "Add HouseCut Percentage Successfull... !",
      House_cut_Percentage: percentage,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Somthing went wrong !" });
  }
};

exports.updatePercentage = async (req, res) => {
  try {
    const { add_Housepercentagecut, _id } = req.body;

    var HousePercentage = (2.5 / 100) * add_Housepercentagecut;
    if (!HousePercentage) {
      return res.status(400).json({
        success: false,
        message: "Percentage is not difine",
      });
    }
    const result = await PercentagemodeUpdate.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          add_Housepercentagecut: HousePercentage,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      Message: "percentage mode updated",
      percentage: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Somthing went wrong !" });
  }
};

exports.GetAllProfile = async (req, res) => {
  try {
    const users = await userSchema.find();
    if (users) {
      res
        .status(200)
        .json({ success: true, message: "All users !", users: users });
    } else {
      res.status(400).json({ success: false, message: "No data available !" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const reqBody = req.body;
    const { user_id } = reqBody;
    const user = await User.findOne({ _id: user_id });
    if (user) {
      const user = await userProfile.findOne({ userId: user_id });
      if (user) {
        const userWallet = await walletSchema.findOne({ userid: user_id });
        res.status(200).json({
          success: true,
          message: "All users !",
          user: user,
          user_wallet: userWallet,
        });
      } else {
        res.status(400).json({ success: false, message: "No data available !" });
        const data = await User.findOne({ _id: user_id });
        if (data) {
          const user = await userProfile.findOne({ userId: user_id });
          if (user) {
            const userWallet = await walletSchema.findOne({ userid: user_id });
            res.status(200).json({
              success: true,
              message: "All users !",
              user: user,
              user_wallet: userWallet,
            });
          } else {
            res
              .status(400)
              .json({ success: false, message: "No data available !" });
          }
        }
      }
    }

  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.delete_basetournament = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await Basetournament.findOne({
      _id: _id,
    });
    console.log(data);
    if (data) {
      const dataDelete = await Basetournament.findOneAndDelete({
        _id: _id,
      });
      res.send({ success: true, Message: "tournament deleted" });
    } else {
      res.send({ success: false, Message: "tournament not exist" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.admin_get_Alltournament = async (req, res) => {
  try {
    const data = await tournamentmodel.find();
    res.send({ tournamentmodel: data });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "invalide request!" });
  }
};




// exports.payout=async(req,res)=>{
//   try{
//     const payout = await stripe.payouts.create({
//       amount: 1100,
//       currency: 'usd',
//     });
//     res.send({ payout: payout});
//   }
//   catch (e) {
//     console.log(e);
//     res.status(400).json({ success: false, message: "invalide request!" });
//   }
// }


// exports.payout1=async(req,res)=>{
//   try{
//     const account = await stripe.accounts.create({
//       type: 'custom',
//       country: 'US',
//       email: 'jenny.rosen@example.com',
//       capabilities: {
//         card_payments: {requested: true},
//         transfers: {requested: true},
//       },
//     });
//     res.send({ account: account});
//   }
//   catch (e) {
//     console.log(e);
//     res.status(400).json({ success: false, message: "invalide request!" });
//   }
// }



exports.sendRequest = async (req, res) => {
  try {
    const id = req.user._id;
    console.log(id);
    const user = await Profile.findOne({ userId: id })
    if (!user.payPal_Id) {
      res.status(400).json({ success: false, message: "Please add paypal email in your profile!" });
    }
    else {
      const userfind = await userbankdetails.findOne({ email: user.payPal_Id })
      if (userfind) {
        res.status(200).json({ success: false, message: "You already send the request !" });
      }
      else {
        const account = await userbankdetails.create({
          email: user.payPal_Id,
          amount: req.body.amount,
          status: req.body.status,
          userId: user.userId
        });
        const userprofile = await Profile.findOne({ userId: id })
        let coin = userprofile.coins - req.body.amount

        const data = await Profile.findOneAndUpdate(
          { userId: id },
          {
            $set: {
              coins: coin,
            },
          },
          { new: true }
        );

        const bankdata = await bankstatement.findOneAndUpdate(
          { userId: id },
          {
            $set: {
              withdrawals: req.body.amount,
            },
          },
          { new: true }
        );

        res.status(200).json({ success: true, message: "You send the request to the admin !", result: account });
      }
    }
  }
  catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "invalide request!" });
  }
}


exports.update_Batchid= async (req, res) => {
  try {
      const _id = req.body.id
      const update = await userbankdetails.findByIdAndUpdate(_id, req.body)
      res.status(200).json({ success: true, message: "updated successfully", result: update });
    }
  catch (error) {
      return res.status(500).json({
          status: 0,
          message: "something went wrong",
      });
  }
},




(exports.get_Allrequest = async (req, res) => {
  try {
    const data = await userbankdetails.find();
    res.send({ result: data });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
})



exports.update_status = async (req, res) => {
  try {
    const user = req.body.userId;
    const { status } = req.body;
    const data = await userbankdetails.findOneAndUpdate(
      { userId: user },
      {
        $set: {
          status: status,
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



exports.get_current_room = async (req, res) => {
  try {
    const data = await multiplyerSchema.find({});
    if (data.length > 0) {
      // const{players} = data[0];
      let players = [];
      data.filter((element) => {
        if (element.winner.userId === undefined) {
          // console.log(element.players,{ "userId": element.players[0].userId });
          players.push({
            "room_Id": element.room_Id, "price": element.price,
            "players": element.players
          });
        }
      });
      res.status(200).json({
        success: true,
        message: "Current Room is  find",
        result: players,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Current Room is not exit" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "invalide request!" });
  }
};


exports.get_Complete_Room = async (req, res) => {
  try {
    const data = await multiplyerSchema.find({});
    if (data.length > 0) {
      let players = [];
      data.filter((element) => {
        if (element.winner.userId) {
          // console.log(element.winner);
          players.push({
            "room_Id": element.room_Id, "price": element.price,
            "players": element.players,
            "winner": element.winner
          });
        }
      });
      res.status(200).json({
        success: true,
        message: "Current Room is  find",
        result: players,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Complete room is not exit" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "invalide request!" });
  }
};

// exports.getcomplet_room = async (req, res) => {
//   try {
//     const data = await multiplyerSchema.find({});
//     for (i = 0; i <= data.length; i++) {
//       // console.log("winnerData",data[i].winner);
//       if (Object.keys(data[i].winner).length > 0) {
//         return res.status(200).json({
//           success: true,
//           message: "Complete Room is find Successfull...",
//           result: data,
//         });
//       }
//       else {
//         res
//           .status(400)
//           .json({ success: false, message: "Complete Room is not find" });
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ success: false, message: "invalide request!" });
//   }
// };

exports.payout = async (req, res) => {
  try {
    const payout = await stripe.payouts.create({
      amount: 1100,
      currency: "usd",
    });
    console.log(payout);
    res.send({ payout: payout });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "invalide request!" });
  }
};

exports.payout1 = async (req, res) => {
  try {
    const account = await stripe.accounts.create({
      type: "custom",
      country: "US",
      email: "mailto:jenny.rosen@example.com",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    res.send({ account: account });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "invalide request!" });
  }
};

exports.userpaymentdetail = async (req, res) => {
  try {
    const account = await userbankdetails.create({
      accountNumber: req.body.accountNumber,
      account_holder_name: req.body.account_holder_name,
      account_holder_type: req.body.account_holder_type,
      bank_name: req.body.bank_name,
      country: req.body.country,
      // currency: req.body.currency,
      last4: req.body.last4,
    });
    if (account) {
      res.status(200).json({
        success: true,
        message: "user details success",
        result: account,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "all feilds are required" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "invalide request!" });
  }
}



exports.GetUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const searchedProfile = await userProfile.findOne({ userId: userId });
    if (searchedProfile) {
      res.send({ success: true, userProfile: searchedProfile });
    } else {

      res.send({ success: false, profile: null });
    }
  }
  catch (e) {
    res.send({ success: false, profile: null, Message: e });

  }
}



exports.update_statusComment = async (req, res) => {
  try {
    const user = req.body.userId;
    const { status, comment } = req.body;
    const userreq = await userbankdetails.findOne({ userId: user })
    if (userreq) {
      const data = await userbankdetails.findOneAndDelete(
        { userId: user },
        {
          $set: {
            status: status,
            comment: comment
          },
        },
        { new: true }
      );
      const usercommet = await bankstatement.findOneAndUpdate(
        { userId: user },
        {
          $set: {
            status: status,
            comment: comment
          },
        },
        { new: true }
      );
      if (usercommet) {
        const getCoin = await Profile.findOne({ userId: user })
        let plus = getCoin.coins + data.amount
        const adddata = await Profile.findOneAndUpdate(
          { userId: user },
          {
            $set: {
              coins: plus,
            },
          },
          { new: true }
        );
        if (!data) {
          return res.status(404).json({
            success: true,
            massage: "user  not Exits",
            profile: null,
          });
        }
        res
          .status(200)
          .json({ success: true, massage: "Update successfully !", result: usercommet });
      }
      else {
        res.status(400).json({ success: false, massage: "UserId not exits!" });
      }
    }

  } catch (err) {
    console.log(err);
    res.send(err);
  }
};