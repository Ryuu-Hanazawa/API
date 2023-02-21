const db = require("../configs/db");

module.exports = {
  searchProduct: (keyword, sortBy, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      let qs = "";
      if (sortBy) {
        qs = `SELECT p.id, p.product_name, p.product_brand, p.image, p.product_description, p.product_price, c.category_name, p.product_color, p.size,p.product_rating, p.product_qty FROM items AS p JOIN categories AS c ON c.id = p.category_id WHERE p.product_name LIKE ? ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`;
      } else {
        qs =
          "SELECT p.id, p.product_name, p.product_brand, p.image, p.product_description, p.product_price, c.category_name, p.product_color, p.size,p.product_rating, p.product_qty FROM items AS p JOIN categories AS c ON c.id = p.category_id WHERE p.product_name LIKE ?";
      }

      db.query(qs, keyword, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  searchByCategory: (keyword, sortBy, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      let qs = "";
      if (sortBy) {
        qs = `SELECT p.id, p.product_name, p.product_brand, p.image, p.product_description, p.product_price, c.category_name, p.product_color, p.size,p.product_rating, p.product_qty FROM items AS p JOIN categories AS c ON c.id = p.category_id WHERE c.category_name LIKE ? ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`;
      } else {
        qs =
          "SELECT p.id, p.product_name, p.product_brand, p.image, p.product_description, p.product_price, c.category_name, p.product_color, p.size,p.product_rating, p.product_qty FROM items AS p JOIN categories AS c ON c.id = p.category_id WHERE c.category_name LIKE ?";
      }

      db.query(qs, keyword, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  searchByNameAndColor: (keyword, sortBy, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      let qs = "";
      if (sortBy) {
        qs = `SELECT p.id, p.product_name, p.product_brand, p.image, p.product_description, p.product_price, c.category_name, p.product_color, p.size,p.product_rating, p.product_qty FROM items AS p JOIN categories AS c ON c.id = p.category_id WHERE p.product_color LIKE ? AND p.product_name LIKE ? ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`;
      } else {
        qs =
          "SELECT p.id, p.product_name, p.product_brand, p.image, p.product_description, p.product_price, c.category_name, p.product_color, p.size,p.product_rating, p.product_qty FROM items AS p JOIN categories AS c ON c.id = p.category_id WHERE c.category_name LIKE ?";
      }

      db.query(qs, keyword, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    })
  }
};
