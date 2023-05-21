const express = require("express");
var bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const fnurggRouter = require("./routes/fnurggRouter")
const cors = require("cors");

const app = express();
require("./configs/dbconfig");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/fnurgg", fnurggRouter);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(3004, (err) => {
  if (err) console.log(err);
  else console.log("server running on 3004");
});
