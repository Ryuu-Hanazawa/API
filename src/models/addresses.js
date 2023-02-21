const db = require("../configs/db");

module.exports = {
  addresses: (id) => {
    return new Promise((resolve, reject) => {
      const queryString = "SELECT a.id, a.name, a.city, a.street, a.province, a.postal_codes, a.country FROM addresses AS a WHERE user_id = ?";
      db.query(queryString, id, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      })
    })
  },
  postAddress: (insertBody) => {
    return new Promise((resolve, reject) => {
      const queryString = "INSERT INTO addresses SET ?";
      db.query(queryString, insertBody, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  updateAddress: (updateBody, idBody) => {
    return new Promise((resolve, reject) => {
      const queryString = "UPDATE addresses SET ? WHERE ?";
      db.query(queryString, [updateBody, idBody], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  deleteAddress: (id) => {
    return new Promise((resolve, reject) => {
      const queryString = "DELETE FROM addresses WHERE id = ?";
      db.query(queryString, id, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  }
}