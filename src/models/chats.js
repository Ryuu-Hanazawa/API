const db = require("../configs/db");

module.exports = {
  // ====================================== //
  addNewMessages: (body) => {
    return new Promise((resolve, reject) => {
      const queryStr = "INSERT INTO chats SET ?";
      db.query(queryStr, body, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  // ====================================== //
  getListChatSeller: (id) => {
    return new Promise((resolve, reject) => {
      const queryStr =
        "SELECT chat_room FROM chats WHERE seller = ? GROUP BY chat_room";
      db.query(queryStr, id, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              data: data,
            });
          } else {
            resolve({
              status: 200,
              data: [],
            });
          }
        } else {
          reject({
            status: 500,
            details: err,
          });
        }
      });
    });
  },
  // ====================================== //
  getListChatBuyer: (id) => {
    return new Promise((resolve, reject) => {
      const queryStr =
        "SELECT chat_room FROM chats WHERE buyer = ? GROUP BY chat_room";
      db.query(queryStr, id, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              data: data,
            });
          } else {
            resolve({
              status: 200,
              data: [],
            });
          }
        } else {
          reject({
            status: 500,
            details: err,
          });
        }
      });
    });
  },
  // ====================================== //
  getNewMessage: (chatRoom) => {
    return new Promise((resolve, reject) => {
      const queryStr =
        "SELECT c.id, c.buyer, c.seller, c.chat_room, c.sender as sender_id, u.name as sender_name, c.message, c.created_at FROM chats c JOIN users u ON c.sender = u.id WHERE c.chat_room = ? ORDER BY c.created_at DESC";
      db.query(queryStr, chatRoom, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              data: data,
            });
          } else {
            resolve({
              status: 200,
              data: [],
            });
          }
        } else {
          reject({
            status: 500,
            details: err,
          });
        }
      });
    });
  },
};
