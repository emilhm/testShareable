/**
 * Likes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    like:{
      type: 'boolean',
      required: true
    },
    question: {
      model: 'Questions',
      required: true
    },
    user: {
      model:'User',
      required: true
    },
    getCantlike: function (){
      return this.user.length;
    },
    toJSON: function() {
      var obj = this.toObject();
      obj.cantlike = this.getCantlike();
      return obj;
    }
  }
};
