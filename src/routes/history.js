const express = require("express");

const router = express.Router();
const historyController = require("../controllers/history");

// @desc    Show all products
// @route   GET /histories
router.get("/:id", historyController.histories);

// @desc    Process add history
// @route   POST /histories
router.post("/", historyController.postNewHistory);

module.exports = router;