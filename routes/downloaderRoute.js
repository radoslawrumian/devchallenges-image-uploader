const path = require("path");

const express = require("express");

const router = express.Router();
const fs = require("fs");

router.use("/i/:id", (req, res) => {
  fs.readdir("./uploads", (err, files) => {
    if (err) {
      throw err;
    }
    let fornumber = 0;
    files.every((file) => {
      if (file == req.params.id) {
        console.log(file);
        res.cookie("filename", JSON.parse(fs.readFileSync(path.join(__dirname, "..", "uploads", req.params.id, req.params.id + ".json"))).name )

        res.render("downloader", {
          id: req.params.id,
        });




        



        return false;
      }
      fornumber++;
      if (fornumber == files.length) {
        res.render("error404");
      }
      return true;
    });
  });

  console.log(req.params.id);
});

router.use("/g/:id", (req, res) => {
  fs.readdir("./uploads", (err, files) => {
    if (err) {
      throw err;
    }
    let fornumber = 0;
    files.every((file) => {
      if (file == req.params.id) {
        res.sendFile(
          path.join(__dirname, "..", "uploads", req.params.id, req.params.id)
        );
        return false;
      }
      fornumber++;
      if (fornumber == files.length) {
        res.render("error404");
      }
      return true;
    });
  });

  console.log(req.params.id);
});


router.use("/h/:id", (req, res) => {
  fs.readdir("./uploads", (err, files) => {
    if (err) {
      throw err;
    }
    let fornumber = 0;
    files.every((file) => {
      if (file == req.params.id) {
        res.sendFile(
          path.join(__dirname, "..", "uploads", req.params.id, req.params.id + '.thumb')
        );
        return false;
      }
      fornumber++;
      if (fornumber == files.length) {
        res.render("error404");
      }
      return true;
    });
  });

  console.log(req.params.id);
});
module.exports = router;
