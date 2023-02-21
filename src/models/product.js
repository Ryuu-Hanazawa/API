const db = require("../configs/db");

module.exports = {
  product: (id) => {
    return new Promise((resolve, reject) => {
      const queryString =
        "SELECT p.id, p.user_id, p.product_name,p.image, p.product_brand, p.product_description, p.product_price, c.category_name, p.product_color, p.size,p.product_rating, p.product_qty FROM items AS p JOIN categories AS c ON c.id = p.category_id WHERE p.id = ?";
      db.query(queryString, id, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    })
  },
  updateProduct: (updateBody, idBody) => {
    return new Promise((resolve, reject) => {
      const queryString =
        "UPDATE items SET ? WHERE ?";
      db.query(queryString, [updateBody, idBody], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    })
  },
  postNewProduct: (insertBody) => {
    return new Promise((resolve, reject) => {
      const queryString = "INSERT INTO items SET ?";
      db.query(queryString, insertBody, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    })
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      const queryString = "DELETE FROM items WHERE id = ?";
      db.query(queryString, id, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    })
  },
}