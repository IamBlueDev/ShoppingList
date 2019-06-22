const Product = require('../../models/product');
const Nutrition = require('../../models/nutrition');
const { transformProduct } = require('./merge');
const { productNut } = require('./merge');


module.exports = {
    products: async()=>{
        try{
            const products = await Product.find();
            return products.map(product =>{
                return transformProduct(product);
            })
            return products;
        }catch(err){
            console.log(err)
                throw err;
            } 
         },
    addProdict: async(args,req)=>{
        //const userToAdd =
    },
    createProduct: async(args,req)=>{
        const findExisted = await Product.findOne({'name': args.productInput.name})
        if(findExisted){
            throw new Error('Product exists already.');
        }
        const product = new Product({
            name: args.productInput.name,
            description: args.productInput.description,            
        });
        let productNut;
        if(args.nutInput){
            productNut = new Nutrition({
                energyKj:args.nutInput.energyKj,
               energyKcal:args.nutInput.energyKcal,
               fat:args.nutInput.fat,
               satFat:args.nutInput.satFat,
               carbs:args.nutInput.carbs,
               sugars:args.nutInput.sugars,
               protine:args.nutInput.protine,
               salt:args.nutInput.salt,
               product:product
       })
        }else{

            productNut = new Nutrition({
                     energyKj:0,
                    energyKcal:0,
                    fat:0,
                    satFat:0,
                    carbs:0,
                    sugars:0,
                    protine:0,
                    salt:0,
                    product:product
            })
        
        }
        console.log("Product nut: "+productNut);
        let createdProduct;
        product.nut = productNut;;
        try{
            const result2 = await productNut.save();
            const result = await product.save();
            createdProduct = result;
            return createdProduct;
        }catch(err){
            console.log(err);
            throw err;
        }
    },
}