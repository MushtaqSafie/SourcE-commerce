const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/", (req, res) => {
  db.Customer.findAll().then(data => {
    const obj = data;
    res.render("index", { customer: obj });
  });
});

router.get("/createAccount", (req, res) => {
  res.render("createAccount");
});

router.get("/storeFront", (req, res) => {
  db.Products.findAll().then(data => {
    const obj = data;
    // console.log(obj);
    res.render("storeFront", { products: obj });
  });
});

router.get("/inventory", (req, res) => {
  db.Products.findAll().then(data => {
    const obj = data;
    // console.log(obj);
    res.render("inventory", { products: obj });
  });
});

router.get("/salesDash", (req, res) => {
  db.Orders.findAll({
    include: [db.Products, db.Customer]
  }).then(data => {
    const obj = data;
    // console.log(obj);
    res.render("salesDash", { orders: obj });
  });
});

module.exports = router;
