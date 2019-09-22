const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const socialSchema = new Schema({
  Display: {
    type: String,
    required: true
  },
  socialID: {
    type: String,
    required : true
  },
  Photo: {
    type: String,
    required : false
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  ],
  ProductList: ['ListItem']
});


module.exports = mongoose.model('SocialUser', socialSchema);
