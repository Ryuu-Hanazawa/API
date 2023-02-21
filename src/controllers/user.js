const userModel = require("../models/user");
const form = require("../helpers/form");

module.exports = {
  user: (req, res) => {
    const { id } = req.params;
    userModel
      .user(id)
      .then((data) => {
        if (data.length) {
          res.json(data[0]);
        } else {
          res.status(404).json({
            msg: "Data not found",
          });
        }
      })
      .catch((err) => form.error(res, err));
  },
  updateUSer: (req, res) => {
    const { id } = req.params;
    const { body } = req.params;
    userModel
      .updateUser(body, id)
      .then((data) => {
        const updatedUsers = {
          msg: "Data successfully updated",
          ...data
        };
        res.status(200).json(updatedUsers);
      })
      .catch((err) => form.error(res, err));
  }
}