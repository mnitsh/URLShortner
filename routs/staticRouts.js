const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    return res.render("home");
  })
  .get("/signup", (req, res) => {
    return res.render("signUp");
  })
  .get("/login", (req, res) => {
    return res.render("login");
  });

module.exports = router;
