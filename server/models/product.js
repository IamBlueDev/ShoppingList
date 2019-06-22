const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {

    name:{
      type: String,
      required:true
    },
    description:{
      type: String,
      required:false
    },
    // amount:{
    //   type: Number,
    //   required:false
    // },   
    nut:{
      type: Schema.Types.ObjectId,
      ref: 'Nutrition'
    }
  }
);

module.exports = mongoose.model('Product', productSchema);
