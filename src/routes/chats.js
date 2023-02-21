const express = require("express");

const router = express.Router();
const chatsController = require("../controllers/chats");
const checkToken = require("../middlewares/checkToken");

router.post("/", chatsController.addNewMessages);
router.get("/seller", checkToken.isLogin, chatsController.getListChatSeller);
router.get("/buyer", chatsController.getListChatBuyer);
router.get("/:room", chatsController.getNewMessage);

module.exports = router;