const mySQL = require("mysql");
const { HOST, USER, PASSWORD, DATABASE } = process.env;

const db = mySQL.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "products",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = db;

