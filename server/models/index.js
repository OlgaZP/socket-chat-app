const mongoose = require('mongoose');
const {}

mongoose
  .connect('mongodb://localhost:27017/chat_db')
  .then(() => {
    console.log(`Connection to MongoDB is OK`);
  })
  .catch(err => {
    console.log(`err`, err);
  });

  module.exports.Mesage = require('./message')

