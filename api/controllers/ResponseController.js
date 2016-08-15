/**
 * ResponseController
 *
 * @description :: Server-side logic for managing responses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
require('async');
module.exports = {
  create: function(req, res) {
    var data = req.allParams();
    async.waterfall([
      function(callback) {
        User.findOne({
          id: data.user
        }).exec(function(err, user) {
          if (err) {
            callback(err, null);
            console.log(err);
          }
          if (!user) {
            err = 'No existe ese usuario';
            callback(err, null);
          }
          callback(null, user);
        });
      },
      function(err, callback) {
        Questions.findOne({
          id: data.questions
        }).exec(function(err, category) {
          if (err) {
            callback(err, null);
          }
          if (!category) {
            err = 'No existe pregunta';
            callback(err, category);
          }
          callback(null, category);
        });
      },
    ], function(err, result) {
      if (err) return res.badRequest(err);
      Response.create(data).exec(function(err, question) {
        if (err) return res.badRequest(err);
        User.findOne({
          id: question.user
        }).exec(function(err, user) {
          question.user = user;
          return res.jsonp(question);
        });
      });
    });
  }
};
