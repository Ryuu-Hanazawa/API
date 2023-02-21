const express = require("express");

const router = express.Router();
const userController = require("../controllers/user");
const checkToken = require("../middlewares/checkToken");

router.get("/:id", userController.user);
router.patch("/:id", userController.updateUSer);

module.exports = router;