/**
 * QuestionsController
 *
 * @description :: Server-side logic for managing questions
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
          }
          if (!user) {
            err = 'No existe ese usuario';
            callback(err, null);
          }
          callback(null, user);
        });
      },
      function(err, callback) {
        Category.findOne({
          id: data.category
        }).exec(function(err, category) {
          if (err) {
            callback(err, null);
          }
          if (!category) {
            err = 'No existe categoria';
            callback(err, category);
          }
          callback(null, category);
        });
      },
    ], function(err, result) {
      if (err) return res.badRequest(err);
      Questions.create(data).exec(function(err, question) {
        if (err) return res.badRequest(err);
        return res.jsonp(question);
      });
    });
  }
}
