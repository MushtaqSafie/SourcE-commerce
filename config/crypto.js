const db = require("./seed.js")

//const cryptoJS = require("crypto-js");

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
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64')
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex')
}

module.exports = cryptoJS;
