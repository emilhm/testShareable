/**
 * AnswerRating.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    answer: {
      model: 'Response',
      required: true
    },
    user: {
      model:'User',
      required: true
    },
    vote:{
      type: 'boolean',
      required: true
    }
  }
};
