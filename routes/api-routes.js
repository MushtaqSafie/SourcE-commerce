const db = require("../models");
const crypto = require("crypto")

router.get('/', (req, res) => {
    res.render('main');
});

router.get('/index', (req, res) => {
    res.render('index')
});

router.post('/index', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);
    const user = users.find(u => {
        return u.email === email && hashedPassword === u.password
    });

    if (user) {
        const authToken = generateAuthToken();

        authTokens[authToken] = email;

        res.cookie('AuthToken', authToken);
        res.redirect('/protected')
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
    const { email, firstName, lastName, password, confirmPasword } = req.body;

    // Check if the password and confirm password fields match
    if (password === confirmPasword) {

        //Check if user with the same email is registered
        if (users.find(user => user.email === email)) {

            res.render('createAccount', {
                message: 'User already created.',
                messageClass: 'alert-danger'
            });

            return;
        } const hashedPassword = getHashedPassword(password);

        //Store user into database
        users.push({
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

router.get('/protected', (req, res) => {
    if (req.user) {
        res.render('/protected');
    } else {
        res.render('/index', {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }
});