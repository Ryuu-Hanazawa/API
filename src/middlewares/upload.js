const multer = require("multer");
const path = require("path");
const form = require("../helpers/form");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const nameFormat = `image-${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;
    cb(null, nameFormat);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: 10 * 1000 * 1000, // 2 MB
});

const singleUpload = (req, res, next) => {
  const uploadSingle = upload.single("image");
  uploadSingle(req, res, (err) => {
    if (err) {
      form.error(res, {
        msg: "Multer error",
        err,
      });
    } else {
      let filePath = req.files.map((val) => "/images/" + val.filename);

      req.filePath = filePath.join(",");
      next();
    }
  });
};

const multipleUpload = (req, res, next) => {
  const multiple = upload.array("image", 5);
  multiple(req, res, (err) => {
    if (err) {
      form.error(res, {
        msg: "Multer error",
        err,
      });
    } else {
      // let filePath = req.files.map((val) => "http://localhost:3000" + "/images/" + val.filename);
      let filePath = req.files.map((val) => "/images/" + val.filename);

      req.filePath = filePath.join(",");
      next();
    }
  });
};

module.exports = {
  multipleUpload,
  singleUpload,
};
