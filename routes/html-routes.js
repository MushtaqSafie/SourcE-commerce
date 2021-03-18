const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/", (req, res) => {
  db.Customer.findAll().then(data => {
    const obj = data;
    res.render("index", {
      customer: obj,
      heading: "Login Page"
    });
  });
});

router.get("/createAccount", (req, res) => {
  res.render("createAccount", {
    heading: "Create Account"
  });
});

router.get("/storeFront", (req, res) => {
  db.Products.findAll().then(data => {
    const obj = data;
    // console.log(obj);
    res.render("storeFront", {
      products: obj,
      heading: "Storefront"
    });
  });
});

router.get("/inventory", (req, res) => {
  db.Products.findAll().then(data => {
    const obj = data;
    // console.log(obj);
    res.render("inventory", {
      products: obj,
      heading: "Inventory"
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
      heading: "Sales Dashboard"
    });
  });
});

/* Authentication starts below
 */
const crypt = require("../config/crypto");
const hashPass = crypt.getHashedPassword("cr");
console.log(`hashed password: ${hashPass}`);
const authTok = crypt.generateAuthToken();
console.log(`AuthToken: ${authTok}`);
const authTokens = {};

const customers = [
  //This user added to array to avoid creating a new user on each restart
  {
    firstName: "Bryan",
    lastName: "Cats",
    email: "bryanmeow@me.com",
    password: "password"
  }
];

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/index", (req, res) => {
  res.render("index");
});

router.post("/api/login", (req, res) => {
  console.log(req.body);
  console.log("--------------------------");
  const { email, password } = req.body;
  const hashedPassword = crypt.getHashedPassword(password);
  const customer = customers.find(c => {
    return c.email === email && hashedPassword === c.password;
  });

  if (customer) {
    const authToken = crypt.generateAuthToken();

    authTokens[authToken] = email;

    res.cookie("AuthToken", authToken);
    res.redirect("/salesDash");
    return;
  }
  res.render("/login", {
    messageClass: "Invalid username or password",
    messageClass: "alert-danger"
  });
});

router.get("/createAccount", (req, res) => {
  res.render("createAccount");
});

router.post("/createAccount", (req, res) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  // Check if the password and confirm password fields match
  if (password === confirmPassword) {
    //Check if user with the same email is registered
    if (customers.find(customer => customer.email === email)) {
      res.render("createAccount", {
        message: "User already created.",
        messageClass: "alert-danger"
      });

      return;
    }
    const hashedPassword = crypt.getHashedPassword(password);

    //Store user into database
    customers.push({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    res.render("login", {
      message: "Registration Complete. Continue to login please.",
      messageClass: "alert-success"
    });
  } else {
    res.render("createAccount", {
      message: "Password is not a match",
      messageClass: "alert-danger"
    });
  }
});

router.get("/salesDash", (req, res) => {
  if (req.customer) {
    res.render("/salesDash");
    console.log("reached");
  } else {
    res.render("/login", {
      message: "Please login to continue",
      messageClass: "alert-danger"
    });
  }
});

module.exports = router;
