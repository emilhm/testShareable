var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    id: id
  }, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({
      email: email
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect email.'
        });
      }

      bcrypt.compare(password, user.password, function(err, res) {
        if (!res)
          return done(null, false, {
            message: 'Invalid Password'
          });
        var token = jwt.sign({
          id: user.id,
        }, 'server secret');
        var returnUser = {
          email: user.email,
          createdAt: user.createdAt,
          id: user.id,
          token: token
        };
        return done(null, returnUser, {
          message: 'Logged In Successfully'
        });
      });
    });
  }
));
