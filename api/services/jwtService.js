var jwt = require('jsonwebtoken'),
  tokenSecret = 'clavesecreta';

module.exports = {
  issue: function(payload) {
    var token = jwt.sign(payload, tokenSecret);
    return token;
  },
  verify: function(token, callback) {
    var authorization = jwt.verify(token, tokenSecret, function(err, user) {
      if (err) return callback(err, null);
      if (!user) return callback('Not Found', null);
      return callback(null, user);
    });
  }
};
