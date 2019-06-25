const Event = require('../../models/event');
const User = require('../../models/user');
const Product = require('../../models/product');
const Nutrition = require('../../models/nutrition');


const { dateToString } = require('../../helpers/date');

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
      ProductList: findProductById.bind(this, user._doc.ProductList)
    };
  } catch (err) {
    throw err;
  }
};


const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  };
};


const productNut =async productId =>{
      try{
        const nutrition = await Nutrition.findById(productId)
        console.log(nutrition);
        return{
          ...nutrition.doc,
          _id:nutrition.id,
            energyKj:nutrition.energyKj,
            energyKcal:nutrition.energyKcal,
            fat:nutrition.fat,
            satFat:nutrition.satFat,
            carbs:nutrition.carbs,
            sugars:nutrition.sugars,
            protine:nutrition.protine,
            salt:nutrition.salt,
           product:nutrition.product
          
        }
      }catch (err){
        throw err;
      }
  }
  const findProductById = async productId =>{
      try{
        const product = await Product.findById(productId)
        return{
          ...product._doc,
          _id:product.id,
          name:product.name,
          description:product.description,
          nut: productNut.bind(this,product.nut)
        }
      }catch(err){
        throw err;
      }
  }

  const transformProduct = product => {
    console.log(product.description)
     return {
    ...product._doc,
    _id:product.id,
    name:product.name,
    description:product.description,
    nut: productNut.bind(this,product.nut),
    };
  };

exports.transformEvent = transformEvent;
exports.transformProduct = transformProduct;
exports.findProductById = findProductById;