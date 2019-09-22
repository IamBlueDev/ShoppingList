const Product = require('../../models/product');
const Nutrition = require('../../models/nutrition');
const { transformProduct,findProductById,transformListItem } = require('./merge');
const { productNut } = require('./merge');
const User = require('../../models/user');
const SocialUser = require('../../models/socialuser');
const ListItem = require('../../models/listItem');

const CheckItems = async (array,productToFind)=>{
    console.log("PRODUCT TO FIND : " +productToFind);
     var returnArg = false;
    // array.forEach(element => {
    //     // console.log(element)
    //     if(element.product == productToFind){
    //         console.log("?");
    //         returnArg =  element;
    //     }
    //     // return false;
    // });
    try {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element.product == productToFind){
                // console.log(element.product)
                returnArg = [index, element];
                // var args = [element,elementx];
                // return args;
                // console.log("just checking");
            }
        }
    } catch (error) {
        console.log(error);
    }


    // for (let x = 0; x < array.length; x++) {
    //     // for (let y = 0; y < array[x].length; y++) {
    //         const elementx = array[x];
    //     try {
            
    //         elementx.forEach(element => {
    //             console.log(element)
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    //         // console.log(elementx.length);
    //             // const elementy = array[x][y];
    //                 if(elementx.product == productToFind){
    //                     const args = [x,elementx];
    //                     console.log("ARRAY MARKER : " +elementx)
    //                     return args;

    //                 }else{
    //                   return false;
    //                 }
                
    //             // console.log(elementx.product);
    //             // console.log(elementy);


    //         // }
    //     }
    return returnArg;
}
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
    addProductToUser: async (args,req)=>{
        //const userToAdd =
        // req.userType;
        // const userToAdd = await User.findById(req.userId);
        // console.log("test");
        // console.log(req.headers.authorization);
        // console.log(req);
        // console.log(args.product)

        // const userToAdd = await SocialUser.findById(req.headers.authorization);
        const userToAdd = await SocialUser.findOne({'socialID': req.headers.authorization})
        const currentProductList =  userToAdd.ProductList;
        // const userToAdd = await User.findById('5d0fae0dd82cf30fa0f19f36');
        
        const productToAdd = await Product.findById(args.product);
                // const findAllProducts = await ListItem.findOne({'product': args.product});
            // const findAllProducts =  await currentProductList.get({'product':'5d116e091f2adc0e30e5103b'});
            const findAllProducts =  await CheckItems(currentProductList,args.product);
            console.log("================")
            console.log(productToAdd.photo);

            console.log("================")

            var product;
            // console.log(findAllProducts);
            try{
                if(findAllProducts){
                    product = currentProductList[findAllProducts[0]];
                    product.amount = product.amount + args.amount;
                    userToAdd.markModified('ProductList');
                    // console.log("teste2");
                    await userToAdd.save();
                    return userToAdd;
                }
                
            }catch(e){
                console.log(e);
            }



        const listItem = new ListItem({
            product: productToAdd,
            amount: args.amount,
          });
        //   console.log("test");
        //   console.log(currentProductList)
        try{

            userToAdd.ProductList.push(listItem);
            await userToAdd.save();            
            // await userToAdd.save();
            // return userToAdd;
        }catch(err){
            throw err;
        }
    },
    createProduct: async(args,req)=>{
        console.log(args);
        const findExisted = await Product.findOne({'name': args.productInput.name})
        if(findExisted){
            throw new Error('Product exists already.');
        }
        const product = new Product({
            name: args.productInput.name,
            description: args.productInput.description,  
            photo: args.photo,          
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
    getSocialProducts: async (args) =>{
        // console.log("?>DWd");
        // console.log(args.socialId);
        const userToCheck = await SocialUser.findOne({'socialID': args.socialId})
        try {
                return userToCheck.ProductList.map((item)=>{
                    // console.log(item._id);
                    return transformListItem(item);
                })
                // console.log(transformListItem(userToCheck.ProductList));
     
        } catch (error) {
            console.log(error);
        }
        
        // retturn 
        // products: async()=>{
        //     try{
        //         const products = await Product.find();
        //         return products.map(product =>{
        //             return transformProduct(product);
        //         })
        //         return products;
        //     }catch(err){
        //         console.log(err)
        //             throw err;
        //         } 
        //      },
    try {
        if(userToCheck){
           return userToCheck.productList;
        }
        
    } catch (error) {
        console.log(error);
    }
    },
    getProducts: async =>{
        
    }
}