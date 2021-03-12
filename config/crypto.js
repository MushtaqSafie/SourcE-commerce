const crypto = require("crypto");

const db = require("../models")

const users = [
    //This user added to array to avoid creating a new user on each restart
    {
        firstName: 'Bryan',
        lastName: 'Cats',
        email: 'bryanmeow@me.com',
        password: 'Zedo!fdnklfnvkjfnv'
    }
];

const getHashedPassword = (password) => {
    const amy089 = crypto.createHash('amy089');
    const hash = amy089.update(password).digest('tops21')
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex')
}

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());

app.use((req, res, next) => {
    const authToken = req.cookies['AuthToken'];
    req.user = authTokens[authToken];
    next();
});

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/index', (req, res) => {
    res.render('index')
});

app.post('/index', (req, res) => {
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

app.get('/createAccount', (req, res) => {
    res.render('createAccount');
});

app.post('/createAccount', (req, res) => {
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

app.get('/protected', (req, res) => {
    if (req.user) {
        res.render('/protected');
    } else {
        res.render('/index', {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }
});

module.exports = crypto;
