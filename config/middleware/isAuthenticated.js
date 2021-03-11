fetch(`/api/login/${id}`, {
    method: 'PUT',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },


    function checkAuth(req, res, next) {
    if(!req.session.user_id) {
    res.send('You are not authorized to view this page');
} else {
    next();
}
      }

app.post('/login', function (req, res) {
    var post = req.body;
    if (post.user === 'username' && post.password === 'usernamespassword') {
        req.session.user_id = user_name_id_here;
        res.redirect('/');
    } else {
        res.send('Bad user/pass');
    }
});