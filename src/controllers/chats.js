const chatsModel = require("../models/chats");
const form = require("../helpers/form");

module.exports = {
  // ====================================== //
  addNewMessages: (req, res) => {
    let { body } = req;
    body = {
      ...body,
      created_at: new Date(Date.now()),
    };
    chatsModel
      .addNewMessages(body)
      .then((result) => {
        if (
          global.io
            .to(body.seller)
            .to(body.buyer)
            .emit("refresh", "someMessage")
        ) {
          console.log(`Refresh to ${body.seller} and ${body.buyer}`);
        }
        res.status(200).json(result);
      })
      .catch((err) => form.error(err, res));
  },
  // ====================================== //
  getListChatSeller: (req, res) => {
    const { user_id } = req.decodeToken;
    console.log(user_id);
    console.log(req);
    chatsModel
      .getListChatSeller(user_id)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  },
  // ====================================== //
  getListChatBuyer: (req, res) => {
    const { user_id } = req.decodedToken;
    console.log(user_id);
    chatsModel
      .getListChatBuyer(user_id)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  },
  // ====================================== //
  getNewMessage: (req, res) => {
    const { room } = req.params;
    chatsModel
      .getNewMessage(room)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  },
};
