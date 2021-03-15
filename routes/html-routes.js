const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/", (req, res) => {
<<<<<<< HEAD
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
=======
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
    console.log(obj);
    res.render("storeFront", { products: obj });
  });
});

router.get("/inventory", (req, res) => {
  db.Products.findAll().then(data => {
    const obj = data;
    console.log(obj);
    res.render("inventory", { products: obj });
  });
});

router.get("/salesDash", (req, res) => {
  db.Orders.findAll({
    include: [db.Products, db.Customer]
  }).then(data => {
    const obj = data;
    console.log(obj);
    res.render("salesDash", { orders: obj });
  });
});
>>>>>>> 97c261bbeb61566d6c6e6d6230b580fa9657dc94

module.exports = router;
