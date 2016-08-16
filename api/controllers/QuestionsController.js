/**
 * QuestionsController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
require('async');

module.exports = {
  find: function(req, res) {
    var data = req.allParams();
    var token = req.headers.authorization;
    Questions.findOne(data)
    .populate('user')
    .populate('category')
    .populate('answer')
    .populate('likes')
    .exec(function (err, result) {
      if (err) return res.serverError(err);
      var returnData = result;
      jwtService.verify(token, function (err, token) {
          data.user = token.id;
          Likes.findOne(data).exec(function (err, like) {
            if (err) return res.serverError(err);
            if (!like) {
              returnData.isLike = false;
              return res.jsonp(returnData);
            }
            else {
              returnData.isLike = true;
              return res.jsonp(returnData);
            }
          });
    });
  })
},
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
