GET http://localhost:8080/users

POST http://localhost:8080/users
Content-Type: 'application/json

{
    "name":"Bryan"
    "password": password
}
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      
    },
    */

//Check if the user is authenticated:
//middleware function named CheckAuth used on every route that needs the user to be authenticated:
    function checkAuth(req, res, next) {
        if (!req.session.user_id) {
          res.send('You are not authorized to view this page');
        } else {
          next();
        }
      }

      app.get('/', checkAuth, function (req, res) {
        res.send('if you are viewing this page it means you are logged in');
      });

      app.post('/login', function (req, res) {
        var post = req.body;
        if (post.user === 'username' && post.password === 'usernamespassword') {
          req.session.user_id = user_name_id_here;
          res.redirect('/');
        } else {
          res.send('Bad user/pass');
        }
      });