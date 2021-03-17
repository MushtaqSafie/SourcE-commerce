const express = require("express");
const fs = require('fs');
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
  db.Products.create(req.body).then(result => {
    db.Products.findOne({
      where: {
        id: result.id
      }
    }).then((res) => {
      const buffer = Buffer.from(res.product_image, "base64")
      fs.writeFileSync(`./public${res.product_url}`, buffer);
    });
    res.json({ id: result.insertId })
  });
});

router.post("/api/customers", (req, res) => {
  db.Customer.create(req.body).then(result => res.json({ id: result.insertId })
  );
});

router.post("/api/orders", (req, res) => {
  db.Orders.create(req.body).then(result => res.json({ id: result.insertId }));
});

router.put('/api/burger/:id', (req, res) => {
  db.Order.update(req.body, {
    where: {
      id: req.body.id,
    },
  }).then(result => res.json(result));
  //   if (result.changedRows === 0) {
  //     return res.status(404).end();
  //   }
  //   res.status(200).end();
  // });
});

/* Authentication starts below
 */

router.get("/index", (req, res) => {
  res.render("index");
});

router.post("/index", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);
  const customer = customers.find(c => {
    return c.email === email && hashedPassword === c.password;
  });

  if (customer) {
    const authToken = generateAuthToken();

    authTokens[authToken] = email;

    res.cookie("AuthToken", authToken);
    res.redirect("/salesDash");
    return;
  }
  res.render("/index", {
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
    const hashedPassword = getHashedPassword(password);

    //Store user into database
    customers.push({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    res.render("index", {
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
    //res.render('/protected');
    console.log("reached");
  } else {
    res.render("/index", {
      message: "Please login to continue",
      messageClass: "alert-danger"
    });
  }
});

module.exports = router;
