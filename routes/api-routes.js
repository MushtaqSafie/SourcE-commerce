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

// post new product into the inventory
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

// get new cart-item specific customer
router.get("/api/cartItems/:id", (req, res) => {
  db.Orders.findAll({
    where: { CustomerId: req.params.id, order_status: "cart-item" }
  }).then(result => res.json(result));
});

// post new cart-item into order list
router.post("/api/cartItem", (req, res) => {
  db.Orders.create(req.body).then(result => res.json({ id: result.insertId }));
});

// put cart-items of current user into confirmed-order
router.put("/api/confirmedOrders/:id", (req, res) => {
  db.Orders.update(
    { order_status: "confirmed-order" },
    { where: { CustomerId: req.params.id, order_status: "cart-item" } }
  ).then(result => {
    if (result.changedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
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
  console.log(Customer);
  db.Customer.findOne({ where: { email: emailAddress } }).then(customer => {
    //db.Customer.findOne({ where: { email: emailAddress } }).then(customer.client_type == "business-owner" => {
      //if(true)
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

// sales chart data
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

    // convert data format
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
