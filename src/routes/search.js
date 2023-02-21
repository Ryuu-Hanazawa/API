const express = require("express");

const router = express.Router();
const searchController = require("../controllers/search");

// req query
// localhost:3000/search?{name/category}={value}&sortby={name/latest}&sort={asc/desc}
router.get("/",searchController.searchProduct);
router.get("/multiple",searchController.searchByNameAndColor);

module.exports = router;