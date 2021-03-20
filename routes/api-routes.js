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
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "user_password",
      "client_type"
    ]
  }).then(d => {
    if (d === null) {
      customers.push({
        isValid: false,
        client_type: "notFound",
        user_password: ""
      });
      return res.json(customers[0]);
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
      res.json(customers[0]);
      return;
    }
    customers[0].isValid = false;
    customers[0].client_type = "wrongPass";
    customers[0].user_password = "";
    res.json(customers[0]);
  });
});

router.post("/api/createAccount", (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const {
    emailAddress,
    firstName,
    lastName,
    password,
    confirmPassword
  } = req.body;
  /*console.log(password);
  console.log("data type: ", typeof req.body);
  console.log(req.body);
  */

  //Check if the password and confirm password fields match
  db.Customer.findOne({ where: { email: emailAddress } }).then(customer => {
    //Check if user with the same email is registered
    if (customer) {
      res.json({ response: "User already created" });
      return;
    }
    if (password === confirmPassword) {
      // Check if the 'Are you a busines Owner" checked OR not

      //Store user into database
      const hashedPassword = crypt.getHashedPassword(password);
      db.Customer.create({
        first_name: firstName,
        last_name: lastName,
        email: emailAddress,
        user_password: hashedPassword
      }).then(result => console.log(result));
      res.json({ response: "Registration Complete. Continue to login please" });
      //     // also create authToken and cookies authToken
      return;
    }
    res.json({ response: "Password does not match" });
  });
});

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const startDate = new Date().getDate();
const weekly = new Date().setDate(startDate - 7);

router.get("/api/chartData", (req, res) => {
  db.Orders.findAll({
    include: [
      {
        model: db.Products,
        attributes: ["product_name", "selling_price"]
      }
    ],
    where: {
      order_status: "confirmed-order",
      createdAt: {
        [Op.between]: [weekly, new Date()]
      }
    },
    attributes: ["createdAt", "quantity", "order_status"]
  }).then(data => {
    const helper = [];
    const result = [];

    for (n = startDate; n > startDate - 8; n--) {
      helper.push({ dateOrder: n, totalSale: 0 });
    }

    data.forEach(item => {
      const i = item.dataValues;
      const newObj = {
        dateOrder: i.createdAt.getDate(),
        totalSale: i.quantity * i.Product.selling_price
      };
      helper.push(newObj);
    });

    helper.reduce((res, value) => {
      if (!res[value.dateOrder]) {
        res[value.dateOrder] = {
          dateOrder: value.dateOrder,
          totalSale: 0
        };
        result.push(res[value.dateOrder]);
      }
      res[value.dateOrder].totalSale += value.totalSale;
      return res;
    }, {});

    res.json(result);
  });
});

module.exports = router;
