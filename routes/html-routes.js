const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/", (req, res) => {
  db.Customer.findAll({}).then(data => {
    console.log(data);
    res.render("index", { customer: data });
  });
});

router.get("/create-account", (req, res) => {
  const obj = { db: "data" };
  console.log("obj", obj);
  res.render("index", obj);
});

// router.get("/product", (req, res) => {
//   db.Products.findAll({}).then((data) => {
//     const obj = { product: data };
//     console.log(obj);
//     res.render("index", obj);
//   });
// })

module.exports = router;
