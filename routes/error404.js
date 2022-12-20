const path = require("path");

const express = require("express");

const router = express.Router();

router.get("*", (req, res, next) => {
  res.status(404)
  res.render("error404");
});

module.exports = router;
