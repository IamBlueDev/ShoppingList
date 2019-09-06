const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  socialID: {
    type: String,
    required : false
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  ],
  ProductList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});


module.exports = mongoose.model('User', userSchema);
