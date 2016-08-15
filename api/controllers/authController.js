var passport = require('passport');

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  login: function(req, res) {

    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.badRequest({
          message: info.message,
          user: user
        });
      }
      return res.send({
        message: info.message,
        user: user
      });
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.send('logout')
  }
};
