const express = require('express');;

const router = express.Router();

router.get('/', (req, res) => {

  const obj = { "db": "data" };
  console.log('obj', obj);
  res.render('index', obj)

});

router.get('/create-account', (req, res) => {

  const obj = { "db": "data" };
  console.log('obj', obj);
  res.render('createAccount', obj)


});


module.exports = router