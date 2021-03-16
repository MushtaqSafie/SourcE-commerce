const db = require("../seed");
const passport = require("../config/passport");

module.export = function(app) {
  app.post("/api/loginpagename", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.customers.email
    });
  });

  app.post("/api/signuppagename", (req, res) => {
    db.customers
      .create({
        email: req.body.email,
        password: req.body.password
      })
      .then(() => {
        res.redirect(307, "/api/loginpagename");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/customers_data", (req, res) => {
    if (!req.customers) {
      res.json({});
    } else {
      res.json({
        email: req.customers.email
      });
    }
  });
};
