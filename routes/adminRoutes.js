const express = require("express");
const router = express.Router();
const controller = require("../Controllers/adminController");
const auth = require("../middleware/auth").authCustomer;

router.post("/add_practicemode", controller.add_practicemode);
router.get("/getAlladmindata", controller.getAlladmindata);
router.put("/update_practicemode", controller.update_practicemode);
router.delete("/delete_practicemode/:id", controller.delete_practicemode);
router.delete("/delete_practicemode", controller.delete_practicemode);
router.get("/getAllledgerForAdmin", controller.getAllledgerForAdmin);
router.get("/getledgerForUser", controller.getledgerForUser);
router.post("/create_tournament", controller.create_tournament);
router.get("/AllUserTournament", controller.AllUserTournament);
router.get("/gettournamentadmin", controller.gettournamentadmin);
router.delete("/deleteTournament", controller.deleteTournament);
router.post("/join_tournament", controller.join_tournament);
// router.post("/payment", controller.payment);
router.get("/getJoinAllTournament", controller.getJoinAllTournament);
router.post("/Admin_login", controller.Admin_login);
router.post("/Housecut_Percentage", controller.Housecut_Percentage);
router.put("/updatePercentage", controller.updatePercentage);
router.get("/get/all/users", controller.GetAllProfile);
router.post("/get/user/profile", controller.getUserProfile);
router.post("/delete/basetournament", controller.delete_basetournament);
router.get("/admin/get/Alltournament", controller.admin_get_Alltournament);
router.get("/get_current_room", controller.get_current_room);
router.get("/get_Complete_Room", controller.get_Complete_Room);
// router.get("/getcomplet_room", controller.getcomplet_room);

router.post("/payout", controller.payout);
router.post("/payout1", controller.payout1);
router.post("/payout2", controller.userpaymentdetail);



// router.post("/payout", controller.payout);
// router.post("/payout1", controller.payout1);
router.post('/update_Batchid',controller.update_Batchid)
router.post("/sendRequest", auth, controller.sendRequest);
router.get("/get_Allrequest", controller.get_Allrequest);
router.post("/update_status", controller.update_status);
router.post('/getUserProfile', controller.GetUserProfile)
router.post("/update_statusComment", controller.update_statusComment);


module.exports = router;
