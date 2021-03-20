const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/", (req, res) => {
  db.Customer.findAll().then(data => {
    const obj = data;
    res.render("index", {
      customer: obj,
      heading: "Login Page",
      sidebar: false
    });
  });
});

router.get("/createAccount", (req, res) => {
  res.render("createAccount", {
    heading: "Create Account",
    sidebar: false
  });
});

router.get("/storeFront", (req, res) => {
  console.log(req.cookies, "hello");
  db.Products.findAll().then(data => {
    const obj = data;
    // console.log(obj);
    // res
    //   .cookie("AuthToken", authToken, { maxAge: 10800 })
    //   .send("cookie set", console.log("COOKIES!!"));
    res.render("storeFront", {
      products: obj,
      heading: "Storefront",
      sidebar: true
    });
  });
});

router.get("/inventory", (req, res) => {
  db.Products.findAll().then(data => {
    const obj = data;
    // console.log(obj);
    res.render("inventory", {
      products: obj,
      heading: "Inventory",
      sidebar: true
    });
  });
});

router.get("/salesDash", (req, res) => {
  db.Orders.findAll({
    include: [db.Products, db.Customer]
  }).then(data => {
    const obj = data;
    // console.log(obj);
    res.render("salesDash", {
      orders: obj,
      heading: "Sales Dashboard",
      sidebar: true
    });
  });
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
