const addressModel = require('../models/addresses');
const form = require("../helpers/form");

module.exports = {
  addresses: (req, res) => {
    const { id } = req.params;
    addressModel
      .addresses(id)
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
  postAddress: (req, res) => {
    const { body } = req;
    const insertBody = {
      ...body,
    };
    addressModel
      .postAddress(insertBody)
      .then((data) => {
        const resObj = {
          data: {
            ...insertBody,
          },
        };
        res.json(resObj);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
  updateAddress: (req, res) => {
    const { id } = req.params;
    let { body } = req;
    addressModel
      .updateAddress(body, id)
      .then((data) => {
        const updateAddress = {
          msg: "Update address successfully.",
          ...data
        };
        res.status(200).json(updateAddress);
      })
      .catch((err) => form.error(res, err));
  },
  deleteAddress: (req, res) => {
    const { id } = req.params;
    addressModel
      .deleteAddress(id)
      .then((data) => {
        const deleteAddress = {
          msg: "Successfully deleted address",
          ...data
        };
        res.status(200).json(deleteAddress);
      })
      .catch((err) => form.error(res, err));
  }
}