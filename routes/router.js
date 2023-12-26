const express = require("express");
const { home, upload } = require("../handlers/excelHandler");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("YOu can upload your excel file here");
// });
router.route("/").get(home);
router.route("/upload").post(upload);
module.exports = router;
