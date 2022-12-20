const path = require("path");
const fs = require("fs");

const express = require("express");
const sharp = require("sharp");

const router = express.Router();
const fileUpload = require("express-fileupload");

router.use(
  fileUpload({
    debug: true,
    limits: {
      fileSize: 10485760,
    },
    abortOnLimit: true,
  })
);

const idgenerator = (x) => {
  let result = "";
  let characterset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < x; i++) {
    result += characterset.charAt(
      Math.floor(Math.random() * characterset.length)
    );
  }

  console.log(result);

  return result;
};

const resize = async (id) => {
  sharp(path.join(__dirname, "..", "uploads", id, id))
    .resize({ width: 256 })
    .jpeg()
    .toFile(path.join(__dirname, "..", "uploads", id, id + ".thumb"));
};

const idCheckAndSave = (req, res) => {
  console.log(req.files.image);

  let id = idgenerator(10);

  console.log("id: " + id);

  if (fs.existsSync(path.join(__dirname, "..", "uploads", id))) {
    idCheckAndSave();
  } else {
    if (
      (req.files.image.mimetype == "image/jpeg" ||
        req.files.image.mimetype == "image/png" ||
        req.files.image.mimetype == "image/webp" ||
        req.files.image.mimetype == "image/gif") &&
      req.files.image.size < 10485760
    ) {
      console.log("filesize: " + req.files.image.size);
      fs.mkdirSync(path.join(__dirname, "..", "uploads", id));
      req.files.image.mv(path.join(__dirname, "..", "uploads", id, id), () => {
        resize(id);
        console.log("zapisano i uzyto sharpa");
      });

      let data = {
        size: req.files.image.size,
        name: req.files.image.name,
        encoding: req.files.image.encoding,
        truncated: req.files.image.truncated,
        mimetype: req.files.image.mimetype,
        md5: req.files.image.md5,
      };

      data = JSON.stringify(data);

      fs.writeFileSync(
        path.join(__dirname, "..", "uploads", id, id + ".json"),
        data
      );

      res.cookie("id", id);

      res.sendStatus(200);
    } else {
      console.log("filesize: " + req.files.image.size);
      res.cookie("error", "1");
      res.sendStatus(200);
    }
  }
};

router.post("/upload", (req, res) => {
  idCheckAndSave(req, res);
});

module.exports = router;
