const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
    energyKj:{
        type: Number,
        required:false
    },
    energyKcal:{
        type: Number,
        required:false
    },
    fat:{
        type: Number,
        required:false
    },
    satFat:{
        type: Number,
        required:false
    },
    carbs:{
        type: Number,
        required:false
    },
    sugars:{
        type: Number,
        required:false
    },
    protine:{
        type: Number,
        required:false
    },
    salt:{
        type: Number,
        required:false
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})
module.exports = mongoose.model('Nutrition', nutritionSchema);
