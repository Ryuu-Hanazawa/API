const productsModel = require("../models/products");
const form = require("../helpers/form");

module.exports = {
  products: (req, res) => {
    const { query } = req;
    const limit = Number(query.limit) || 4;
    const page = Number(query.page) || 1;
    // limit  = 5
    // page   = 1 2 3  4
    // offset = 0 5 10 15
    // offset = (page-1)*limit
    const offset = (page - 1) * limit || 0;
    productsModel
      .products(limit, offset)
      .then((data) => {
        if (data.length === 0) {
          const emptyResult = {
            status: 404,
            products: "Page not found",
          };
          res.json(emptyResult);
        }
        const newResult = {
          products: data,
          pageInfo: {
            currentPage: page,
            previousPage:
              page === 1 ? null : `/products?page=${page - 1}&limit=${limit}`,
            nextPage: `/products?page=${page + 1}&limit=${limit}`,
          },
        };
        res.json(newResult);
      })
      .catch((err) => form.error(res, err));
  },

  popularProducts: (req, res) => {
    const { query } = req;
    const limit = Number(query.limit) || 4;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit || 0;
    productsModel
      .popularProducts(limit, offset)
      .then((data) => {
        const newResult = {
          products: data,
          pageInfo: {
            currentPage: page,
            previousPage:
              page === 1 ? null : `/products?page=${page - 1}&limit=${limit}`,
            nextPage: `/products/popular?page=${page + 1}&limit=${limit}`,
          },
        };
        res.json(newResult);
      })
      .catch((err) => form.error(res, err));
  },

  productsById: (req, res) => {
    const { id } = req.params;
    productsModel
      .productsById(id)
      .then((data) => {
        res.json({
          data,
        });
      })
      .catch((err) => form.error(res, err));
  },
};