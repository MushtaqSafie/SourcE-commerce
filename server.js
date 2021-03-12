const express = require("express");
//const exphbs = require("express-handlebars");
//const htmlRouter = require("./routes/html-routes.js");
//const apiRouter = require("./routes/api-routes.js")

// Sets up the Express App
const app = express();
//const PORT = process.env.PORT || 8080;

app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const user = { name: req.body.name, password: req.body.password };
  users.push(user);
  res.status(201).send();
});

app.post("/users/login", (req, res) => {
  const user = users.find(user => user.name = req.body.name);
  if (user === null) {
    return res.status(400).send("Cannot find user");
  }
});

app.listen(3000);

// Requiring our models for syncing
//const db = require("./models");

// Sets up the Express app to handle data parsing
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

// Static directory
//app.use(express.static("public"));

//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
//app.set('view engine', 'handlebars');

// Invoke routes
// htmlRouter(app);
// apiRouter(app);
//app.use(htmlRouter);
// app.use(apiRouter);

// Syncing our sequelize models and then starting our Express app
// !! REMOVE "{ force: true }" @ deployment !!
//db.sequelize.sync({ force: true }).then(() => {
  //app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
//});
