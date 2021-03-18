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

router.get("/index", (req, res) => {
  res.render("index");
});


/* Authentication starts below
router.get("/", (req, res) => {
  res.render("home");
});


router.get("/createAccount", (req, res) => {
  res.render("createAccount");
});
 */


// router.get("/salesDash", (req, res) => {
//   if (req.customer) {
//     res.render("/salesDash");
//     console.log("reached");
//   } else {
//     res.render("/login", {
//       message: "Please login to continue",
//       messageClass: "alert-danger"
//     });
//   }
// });

module.exports = router;
