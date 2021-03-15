const express = require("express");
const db = require("../models");

const router = express.Router();

db.Customer.findAll({}).then(data => {
  console.log(data);
});

router.get('/', (req, res) => {
  res.render('main');
});

router.get('/index', (req, res) => {
  res.render('index')
});

router.post('/index', (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);
  const customer = customers.find(c => {
    return c.email === email && hashedPassword === c.password
  });

  if (customer) {
    const authToken = generateAuthToken();

    authTokens[authToken] = email;

    res.cookie('AuthToken', authToken);
    res.redirect('/salesDash')
    return;
  } else {
    res.render('/index', {
      messageClass: 'Invalid username or password',
      messageClass: 'alert-danger'
    });
  }
});

router.get('/createAccount', (req, res) => {
  res.render('createAccount');
});

router.post('/createAccount', (req, res) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  // Check if the password and confirm password fields match
  if (password === confirmPassword) {

    //Check if user with the same email is registered
    if (customers.find(customers => customer.email === email)) {

      res.render('createAccount', {
        message: 'User already created.',
        messageClass: 'alert-danger'
      });

      return;
    } const hashedPassword = getHashedPassword(password);

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
    res.render('createAccount', {
      message: 'Password is not a match',
      messageClass: 'alert-danger'
    });
  }
});

router.get('/salesDash', (req, res) => {
  if (req.customer) {
    //res.render('/protected');
    console.log("reached");
  } else {
    res.render('/index', {
      message: 'Please login to continue',
      messageClass: 'alert-danger'
    });
  }
});

module.exports = router;
