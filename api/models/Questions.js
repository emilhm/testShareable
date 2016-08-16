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
    message:{
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
    likes: {
      collection: 'likes',
      via: 'question'
    },
    getCantAnswer: function (){
      return this.answer.length;
    },
    getCantlikes: function (){
      return this.likes.length;
    },
    toJSON: function() {
      var obj = this.toObject();
      obj.cantAnswer = this.getCantAnswer();
      obj.likes = this.getCantlikes();
      return obj;
    }
  }
};
