/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  var token;
  if (req.headers && req.headers.authorization) {
   var token = req.headers.authorization
    var parts = req.headers.authorization.split(' ');
    
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.json(401, {err: 'No Authorization header was found'});
  }

  jwtService.verify(token, function (err, token) {
    if (err) return res.json(401, {err: 'Invalid Token!'});
    next();
  });
};
