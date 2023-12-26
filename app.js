const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/router");
const fileUpload = require("express-fileupload");
// const path = require("path");

// //defining aroute
// app.get("/", (req, res) => {
//   //   res.send("this is home page!");
//   res.sendFile(path.join(__dirname, "home.html"));
// });
app.use(cors());
app.use("/", routes);
app.use(fileUpload());
module.exports = app;
