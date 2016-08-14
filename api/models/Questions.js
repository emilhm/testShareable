/**
 * Questions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    question:{
      type: 'string',
      required: true
    },
    user: {
      model: 'User',
      required: true
    },
    category: {
      model: 'Category',
      required: true
    },
    answer: {
      collection: 'Response',
      via: 'questions'
    },
    getCantAnswer: function (){
      return this.answer.length;
    },
    toJSON: function() {
      var obj = this.toObject();
      obj.cantAnswer = this.getCantAnswer();
      return obj;
    }
  }
};
