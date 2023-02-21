const express = require("express");
const router = express.Router();
const checkToken = require("../middlewares/checkToken");


// @desc    Home/
// @route   GET /
router.get("/", checkToken.isLogin, (req, res) => {
  res.send("<h1>Selamat datang</h1>");
});

module.exports = router;