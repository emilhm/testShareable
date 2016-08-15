module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.forbidden('Usted no tiene permiso para realizar esta accion');
  }
};
