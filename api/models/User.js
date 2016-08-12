/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    name: {
      type:'string',
      required: true,
      maxLength: 50
    },
    password :{
      type:'string',
      required: true,
      maxLength: 16
    },
    email:{
      type: 'email',
      unique: true,
    },
    questions: {
      collection: 'questions',
      via: 'user'
    }
  }
};
