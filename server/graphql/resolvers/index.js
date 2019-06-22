const authResolver = require('./auth');
const eventsResolver = require('./events');
const productResolver = require('./products');
//const NuteritonResolver = require('./');



const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...productResolver

};

module.exports = rootResolver;
