const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const messageSchema = new Schema(
  {
    author: {
      type: String,
      match: /^[A-Z][a-z0-9]{2,19}$/,
    },
    body: {
      type: String,
      minlength: 5,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
