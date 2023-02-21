const jwt = require("jsonwebtoken");
const form = require("../helpers/form");

const requireAuth = (req, res, next) => {
  // Must be same with cookie name
  const token = req.cookies.jwtCookies;

  // Check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    form.error(res, {
      msg: "Please Login First",
      status: 401,
    });
  }
};

module.exports = { requireAuth };
