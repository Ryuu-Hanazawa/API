const db = require("../configs/db");

module.exports = {
  user: (id) => {
    return new Promise((resolve, reject) => {
      const queryString = "SELECT id, name, email FROM users WHERE id = ?";
      db.query(queryString, id, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    })
  },
  updateUser: (updateBody, id) => {
    return new Promise((resolve, reject) => {
      const queryString = "UPDATE users SET name ? WHERE id = ?";
      db.query(queryString, [updateBody, id], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    })
  }
}