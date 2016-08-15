/**
 * AnswerRatingController
 *
 * @description :: Server-side logic for managing Answerratings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  rating: function(req, res) {
    var data = req.allParams();
    var vote = {
      'answer': data.answer
    };
    async.waterfall([
      function(callback) {
        data.vote = true;
        AnswerRating.find(data).exec(function(err, result) {
          if (err) callback(err, null);
          vote.positive = result.length;
          callback(null, vote);
        });
      },
      function(err, callback) {
        data.vote = false;
        AnswerRating.find(data).exec(function(err, result) {
          if (err) callback(err, null);
          vote.negative = result.length;
          callback(null, vote);
        });
      },
    ], function(err, result) {
      if (err) return res.badRequest(err);
      return res.jsonp(result);
    });
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
        Response.findOne({
          id: data.answer
        }).exec(function(err, answer) {
          if (err) {
            callback(err, null);
          }
          if (!answer) {
            err = 'No existe respuesta';
            callback(err, answer);
          }
          callback(null, answer);
        });
      },
    ], function(err, result) {
      if (err) return res.badRequest(err);
      AnswerRating.findOne({
        answer: data.answer,
        user: data.user
      }).exec(function(err, answerRating) {
        if (err) {
          callback(err, null);
        }
        if (!answerRating) {
          AnswerRating.create(data).exec(function(err, resp) {
            if (err) return res.badRequest(err);
            return res.jsonp(resp);
          });
        }
        if (answerRating) {
          answerRating.vote = !answerRating.vote;
          AnswerRating.update({
            id: answerRating.id
          }, answerRating).exec(function(err, answerRating) {
            if (err) return res.badRequest(err);
            return res.jsonp(answerRating);
          });
        }
      })
    });
  }
};
