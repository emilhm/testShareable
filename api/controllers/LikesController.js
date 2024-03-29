/**
 * LikesController
 *
 * @description :: Server-side logic for managing Likes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
        Questions.findOne({
          id: data.question
        }).exec(function(err, question) {
          if (err) {
            callback(err, null);
          }
          if (!question) {
            err = 'No existe pregunta';
            callback(err, question);
          }
          callback(null, question);
        });
      },
    ], function(err, result) {
      if (err) return res.badRequest(err);
			Likes.findOne({
				question: data.question,
				user: data.user
			}).exec(function (err, likes) {
				if (err) {
					callback(err, null);
				}
				if (!likes) {
					data.like = true;
					Likes.create(data).exec(function(err, resp) {
		        if (err) return res.badRequest(err);
		        return res.jsonp(resp);
		      });
				}
				if (likes) {
					Likes.destroy(likes).exec(function(err, likes) {
						if (err) return res.badRequest(err);
						return res.jsonp(likes);
					});
				}
			})
    });
  }
};
