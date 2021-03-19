const express = require("express");
const fs = require("fs");
const db = require("../models");

const router = express.Router();

router.get("/api/customers", (req, res) => {
  db.Customer.findAll().then(data => {
    const obj = data;
    console.log(obj);
    res.json(data);
  });
});

router.get("/api/products", (req, res) => {
  db.Products.findAll().then(data => {
    const obj = data;
    console.log(obj);
    res.json(data);
  });
});

router.get("/api/orders", (req, res) => {
  db.Orders.findAll({
    include: [db.Products, db.Customer]
  }).then(data => {
    const obj = data;
    console.log(obj);
    res.json(data);
  });
});

router.post("/api/inventory", (req, res) => {
  // converting base64 data to binary
  const base64Data = req.body.product_image;
  const buff = new Buffer(base64Data, "base64");
  req.body.product_image = buff;

  // save the record to database and generate image in public folder
  db.Products.create(req.body).then(result => {
    db.Products.findOne({
      where: {
        id: result.id
      }
    }).then(res => {
      fs.writeFileSync(`./public${res.product_url}`, res.product_image);
    });
    res.json({ id: result.insertId });
  });
});

// router.post("/api/customers", (req, res) => {
//   // eslint-disable-next-line prettier/prettier
//   db.Customer.create(req.body).then(result => res.json({ id: result.insertId })
//   );
// });

router.post("/api/orders", (req, res) => {
  db.Orders.create(req.body).then(result => res.json({ id: result.insertId }));
});

router.put("/api/orders/:id", (req, res) => {
  db.Order.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(result => res.json(result));
  //   if (result.changedRows === 0) {
  //     return res.status(404).end();
  //   }
  //   res.status(200).end();
  // });
});

// Authentication starts below

const crypt = require("../config/crypto");
const authTokens = {};

router.post("/api/index", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = crypt.getHashedPassword(password);
  const customers = [];
  // helo@me
  // password

  db.Customer.findOne({
    where: { email: email },
    attributes: ["email", "user_password", "client_type"]
  }).then(d => {
    if (d === null) {
      console.log("client not found");
      return res.json({ isValid: false });
    }
    console.log(d.dataValues);
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

      res.json({ isValid: true, client_type: d.client_type });
      return;
    }
    res.json({ isValid: false });
  });
});

router.post("/api/createAccount", (req, res) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  //   // Check if the password and confirm password fields match
  if (password === confirmPassword) {
    //     //Check if user with the same email is registered
    if (customers.find(customer => customer.email === email)) {
      res.render("createAccount", {
        message: "User already created.",
        messageClass: "alert-danger"
      });

      return;
    }
    const hashedPassword = crypt.getHashedPassword(password);

    //     //Store user into database
    customers.push({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    //     // also create authToken and cookies authToken

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

module.exports = router;
