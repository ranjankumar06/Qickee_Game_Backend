const express = require("express");
const fnurggcontroller = require("../Controllers/fnurgg");
const routes = express.Router();

routes.post("/reviewPlus", fnurggcontroller.reviewCount);
routes.get("/getAllreviev", fnurggcontroller.getAllreviev);
routes.post("/updateReview", fnurggcontroller.updateReview);

module.exports = routes;
