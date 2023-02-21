const searchModel = require("../models/search");
const form = require("../helpers/form");

module.exports = {
  searchProduct: (req, res) => {
    const { name, category, sort } = req.query;
    let { sortby } = req.query;
    const searchName = `%${name}%`;
    const searchCategory = `%${category}%`;

    const { query } = req;
    const limit = Number(query.limit) || 4;
    const page = Number(query.page) || 1;
    // limit  = 5
    // page   = 1 2 3  4
    // offset = 0 5 10 15
    // offset = (page-1)*limit
    const offset = (page - 1) * limit || 0;

    if (sortby === "name") {
      sortby = "product_name";
    } else if (sortby === "latest") {
      sortby = "created_at";
    } else if (sortby === "popular") {
      sortby = "product_rating"
    } else if (sortby === "price") {
      sortby = "product_price"
    }

    if (name) {
      searchModel
        .searchProduct(searchName, sortby, sort, limit, offset)
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
                page === 1 ? null : `&page=${page - 1}&limit=${limit}`,
              nextPage: `&page=${page + 1}&limit=${limit}`,
            },
          };
          res.json(newResult);
        })
        .catch((err) => {
          form.error(res, err);
        });
    }

    if (category) {
      searchModel
        .searchByCategory(searchCategory, sortby, sort, limit, offset)
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
                page === 1 ? null : `&page=${page - 1}&limit=${limit}`,
              nextPage: `&page=${page + 1}&limit=${limit}`,
            },
          };
          res.json(newResult);
        })
        .catch((err) => {
          form.error(res, err);
        });
    }
  },
  searchByNameAndColor: (req, res) => {
    const { color, name, sort } = req.query;
    let { sortby } = req.query;

    const { query } = req;
    const limit = Number(query.limit) || 4;
    const page = Number(query.page) || 1;
    // limit  = 5
    // page   = 1 2 3  4
    // offset = 0 5 10 15
    // offset = (page-1)*limit
    const offset = (page - 1) * limit || 0;

    if (sortby === "name") {
      sortby = "product_name";
    } else if (sortby === "latest") {
      sortby = "created_at";
    } else if (sortby === "popular") {
      sortby = "product_rating";
    } else if (sortby === "price") {
      sortby = "product_price";
    }

    const keyword = [
      "%" + color + "%",
      "%" + name + "%",
    ];

    searchModel
      .searchByNameAndColor(keyword, sortby, sort, limit, offset)
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
              page === 1 ? null : `&page=${page - 1}&limit=${limit}`,
            nextPage: `&page=${page + 1}&limit=${limit}`,
          },
        };
        res.json(newResult);
      })
      .catch((err) => {
        form.error(res, err);
      });
  }
};
