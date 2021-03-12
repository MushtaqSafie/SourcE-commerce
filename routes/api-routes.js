const db = require("../models");
const crypto = require("crypto")

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/index', (req, res) => {
    res.render('index')
});

app.post('/index', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);