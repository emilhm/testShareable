/**
 * Response.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    response:{
      type: 'string',
      required: true
    },
    questions: {
      model: 'Questions',
      required: true
    },
    user: {
      model:'User',
      required: true
    }
  }
};
