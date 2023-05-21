const express = require("express");
const usercontroller = require("../Controllers/userController");
const routes = express.Router();
const auth = require("../middleware/auth").authCustomer;

routes.post("/signup", usercontroller.signup);
routes.post("/login", usercontroller.login);
routes.post("/sendOtp", usercontroller.sendotp);
routes.post("/email_verify", usercontroller.email_verify);
routes.get("/get_users", usercontroller.get_users);
routes.get("/getone_user", auth, usercontroller.getone_user);
routes.post("/Add_userProfile", auth, usercontroller.Add_userProfile);
routes.get("/getUser_profile", auth, usercontroller.getUser_profile);
routes.post("/update_coins", auth, usercontroller.update_coins);
routes.post("/forgetpasswordsendotp", usercontroller.forgetpasswordsendotp);
routes.post("/resetPassword", usercontroller.resetPassword);
routes.post("/wallet", auth, usercontroller.wallet);
routes.get("/getwallet", auth, usercontroller.getwallet);
routes.post("/ledger", auth, usercontroller.Userledger);
routes.get("/getUser_byid/:id", usercontroller.getOneuser);
routes.post("/delUser", auth, usercontroller.delUser);
// routes.patch("/uniqueUsername", usercontroller.uniqueUsername);
routes.get("/getUser_byid/:id", usercontroller.getOneuser);
// routes.delete("/deleteUser1",auth, usercontroller.delUser);
routes.post("/Userledger", auth, usercontroller.Userledger);
routes.get("/getOneuser", usercontroller.getOneuser);
routes.post("/delUser", auth, usercontroller.delUser);
routes.post("/checkuserName", usercontroller.checkUsername);
routes.post("/create_basetournament", usercontroller.create_basetournament);
routes.get("/get_Alltournament", usercontroller.get_Alltournament);

routes.get("/get_Leaderboard", usercontroller.get_Leaderboard);


routes.get("/get_Allbasetournament", usercontroller.get_Allbasetournament);
routes.post("/add_tournamentdata", usercontroller.add_tournamentdata);
routes.post("/create_testtournament", usercontroller.create_testtournament);
routes.post("/get_tournament", usercontroller.get_tournament);
routes.post("/get_basetournament", usercontroller.get_basetournament);
routes.post("/join_tournament", auth, usercontroller.join_tournament);
routes.post("/update_tournament", usercontroller.update_tournament);
routes.post("/update_tournament_data", usercontroller.update_tournamentdata);
routes.post("/delete_tournament", usercontroller.delete_tournament);
// routes.patch("/uniqueUsername",auth,usercontroller.uniqueUsername);
routes.post("/create_tournament1", usercontroller.create_tournament1);
routes.post("/add_tournamentdata2", usercontroller.add_tournamentdata2);
routes.post("/join/random/tournament", usercontroller.join_tournament3);
routes.post("/add_winner", auth, usercontroller.add_winner);
routes.post("/create/user/wallet", auth, usercontroller.createUserWallet);
routes.get("/get/wallet", auth, usercontroller.Userwallet);
routes.get("/User/Get/All/Tournament", usercontroller.User_Get_All_Tournament);
routes.post("/delete/Tournament", usercontroller.delete_Tournament);
routes.get("/get/User/Leader", auth, usercontroller.get_User_Leader);

routes.get("/checkwallet", auth, usercontroller.checkwallet);

routes.post("/create_multipleayer", auth, usercontroller.create_multipleayer);
routes.post("/join_Multiplyer", auth, usercontroller.join_Multiplyer);
routes.post("/winner_Multiplyer", auth, usercontroller.winner_Multiplyer);
routes.post("/get_One_room", auth, usercontroller.get_One_room);
routes.post("/update_score", auth, usercontroller.update_score);

routes.post("/update_tonument_score", auth, usercontroller.update_tonument_score);
routes.post("/bankstatements", auth, usercontroller.bankstatements);
routes.get("/oneuserstatements", auth, usercontroller.oneuserstatements);
routes.post("/update_status", auth, usercontroller.update_status);
routes.post("/getbystatus", usercontroller.getbystatus);
routes.get("/get_Allstatements", usercontroller.get_Allstatements);
routes.post("/get_All", usercontroller.get_All);
routes.post("/paybatchid", usercontroller.paybatchid);
routes.post("/deleteuserAccount", auth, usercontroller.delete_user_account);
routes.post("/update_payPal_id", auth, usercontroller.update_payPal_id);
routes.post("/deleteuserAccount1", usercontroller.delete_user);
routes.get("/get_All_batchid", usercontroller.get_All_batchid);
routes.post("/findWinner", usercontroller.findWinner);

routes.post("/deleteroom", usercontroller.delete_room);


module.exports = routes;
