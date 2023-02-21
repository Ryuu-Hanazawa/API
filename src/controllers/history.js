const historyModel = require("../models/history");
const form = require("../helpers/form");

const randomToken = () => {
  // Declare a string variable
  // which stores all string
  let string = "0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ";
  let OTP = "";

  // Find the length of string
  let len = string.length;
  for (let i = 0; i < 6; i++) {
    OTP += string[Math.floor(Math.random() * len)];
  }
  return OTP;
}

module.exports = {
  histories: (req, res) => {
    const { id } = req.params;
    historyModel
      .histories(id)
      .then(data => {
        form.success(res, data);
      })
      .catch(err => {
        form.error(res, err);
      })
  },
  postNewHistory: (req, res) => {
    const { body } = req;
    const year = new Date().getFullYear();
    const id = body.user_id;
    const genToken = randomToken();
    const insertBody = {
      ...body,
      // transaction_date: new Date(Date.now()),
      invoice_id: `INV/${year}/${id}/${genToken}`
    };
    historyModel
      .postNewHistory(insertBody)
      .then(data => {
        const resObj = {
          data: {
            id: data.insertBody,
            ...insertBody,
          },
        };
        res.json(resObj);
      })
      .catch(err => {
        form.error(res, err);
      });
  }
}