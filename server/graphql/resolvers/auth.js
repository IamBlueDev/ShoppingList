const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Product = require('../../models/product');

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({email,password}) =>{
    const user= await User.findOne({email:email});
    if(!user){
      throw new Error('User does not exist!')
    }
    const isEqual = await bcrypt.compare(password,user.password);
    if(!isEqual){
      throw new Error('Password is incorrect');
    }
   const token= await jwt.sign({userId: user.id,email:user.email},
    'wj1i2233dllm' //token here
    ,{expiresIn:'1h'});
    let productListA = user.ProductList.map(async product =>{
        const productinDB = await Product.findById(product)
        let productListB = []
        productListB.push({name:productinDB.name})
        return {name:productinDB.name, description:productinDB.description, nut:productinDB.nut}
       // return productListA.push(productListB)
    })
      
    
      return {userId:user.id,token:token,tokenExpiration:1,productList:productListA};
  }
};
