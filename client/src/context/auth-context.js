import React from 'react';
 const updateUserProducts = (socialID,product)=> {
    console.log(socialID);
    //pass ammount here too 
   return `
      mutation {
        addProductToUser(product:"${product}") {
            _id,
        }
      }
    `
  };    
export default React.createContext({
    token:null,
    userId:null,
    productList:[],
    photo:"",
    itemList:[],
    login:()=>{

    },
    logout:()=>{},
    setList:()=>{},
    emptyList:()=>{},
    updateUserList:()=>{
    },

})