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

router.post("/api/customers", (req, res) => {
  // eslint-disable-next-line prettier/prettier
  db.Customer.create(req.body).then(result => res.json({ id: result.insertId })
  );
});

router.post("/api/orders", (req, res) => {
  db.Orders.create(req.body).then(result => res.json({ id: result.insertId }));
});

router.put("/api/burger/:id", (req, res) => {
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

/* Authentication starts below
 */
const customers = [
  //This user added to array to avoid creating a new user on each restart
  {
    firstName: "Bryan",
    lastName: "Cats",
    email: "bryanmeow@me.com",
    password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg="
  }
];
/*router.get("api/login", (req, res) => {
  res.json(json.stringify(req));
});
*/
const crypt = require("../config/crypto");
const authTokens = {};

router.post("/api/index", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = crypt.getHashedPassword(password);
  const customer = customers.find(c => {
    return c.email === email && hashedPassword === c.password;
  });

  if (customer) {
    console.log("its true");
    const authToken = crypt.generateAuthToken();

    authTokens[authToken] = email;
    console.log(authTokens);
    res.cookie("AuthToken", authToken);

    // res.json({ id: "insertId" })
    res.redirect("/salesDash");
    return;
  }
  res.render("index", {
    messageClass: "Invalid username or password",
    messageClass: "alert-danger"
  });
  console.log('this is not true');
});

module.exports = router;
