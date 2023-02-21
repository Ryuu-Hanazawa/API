const db = require("../configs/db");

module.exports = {
  products: (limit, offset) => {
    return new Promise((resolve, reject) => {
      const queryString =
        "SELECT p.id, p.product_name, p.image, p.product_brand, p.product_description, p.product_price,p.created_at, p.updated_at, c.category_name, p.product_color, p.size,p.product_rating, p.product_qty FROM items AS p JOIN categories AS c ON c.id = p.category_id ORDER BY p.updated_at DESC LIMIT ? OFFSET ?";
      db.query(queryString, [limit, offset], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  productsById: (id) => {
    return new Promise((resolve, reject) => {
      const queryString =
        "SELECT p.id, p.product_name,p.image, p.product_brand, p.product_description, p.product_price, c.category_name, p.product_color, p.size,p.product_rating, p.product_qty FROM items AS p JOIN categories AS c ON c.id = p.category_id WHERE user_id = ?";
      db.query(queryString, id, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      })
    })
  },

  popularProducts: (limit, offset) => {
    return new Promise((resolve, reject) => {
      const queryString =
        "SELECT p.id, p.product_name, p.image, p.product_brand, p.product_description, p.product_price, c.category_name, p.product_color, p.size,p.product_rating, p.product_qty FROM items AS p JOIN categories AS c ON c.id = p.category_id ORDER BY p.product_rating DESC LIMIT ? OFFSET ?";
      db.query(queryString,[limit, offset], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};