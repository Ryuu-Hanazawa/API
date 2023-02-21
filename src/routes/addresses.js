const express = require("express");

const router = express.Router();
const addressController = require("../controllers/addresses");
const checkToken = require("../middlewares/checkToken");

// @desc    Show single address
// @route   GET /address/{id_address}
router.get("/:id", addressController.addresses);

// @desc    Post an address
// @route   POST /address
router.post("/", checkToken.isLogin, addressController.postAddress);

// @desc    Update an address
// @route   PATCH /address/{id_address}
router.patch("/", checkToken.isLogin, addressController.updateAddress);

// @desc    Delete an address
// @route   DELETE /address/{id_address}
router.delete("/:id", checkToken.isLogin, addressController.deleteAddress);

module.exports = router;
