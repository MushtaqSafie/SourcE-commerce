const express = require("express");
const db = require("../models");
const router = express.Router();
const crypt = require("../config/crypto");

// Authentication starts below
const authTokens = {};
let customers = [];

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = crypt.getHashedPassword(password);
  customers = [];
  // helo@me
  // password

  db.Customer.findOne({
    where: { email: email },
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "user_password",
      "client_type"
    ]
  }).then(d => {
    checked = true;
    if (d === null) {
      customers.push({
        isValid: false,
        client_type: "notFound",
        user_password: ""
      });
      return res.redirect(301, "/");
    }
    customers.push(d.dataValues);

    const customer = customers.find(c => {
      return (
        c.email.toLowerCase() === email.toLowerCase() &&
        hashedPassword === c.user_password
      );
    });

    if (customer) {
      const authToken = crypt.generateAuthToken();

      authTokens[authToken] = email;
      res.cookie("AuthToken", authToken);

      customers[0].isValid = true;
      customers[0].first_name = d.first_name;
      customers[0].last_name = d.last_name;
      customers[0].client_type = d.client_type;
      customers[0].user_password = "";
      if (customers[0].client_type === "business-owner") {
        customers[0].businessOwner = true;
        res.redirect(301, "/salesDash");
      } else {
        customers[0].businessOwner = false;
        res.redirect(301, "/storeFront");
      }
    }
    customers[0].isValid = false;
    customers[0].client_type = "wrongPass";
    customers[0].user_password = "";
    res.redirect(301, "/");
  });
});

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
  db.Products.findAll().then(data => {
    const obj = data;
    // console.log(obj);
    console.log(customers[0]);
    res.render("storeFront", {
      customerInfo: customers[0],
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
    console.log(customers[0]);
    res.render("inventory", {
      customerInfo: customers[0],
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
    console.log(customers[0]);
    res.render("salesDash", {
      customerInfo: customers[0],
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
