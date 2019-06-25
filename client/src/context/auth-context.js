import React from 'react';

export default React.createContext({
    token:null,
    userId:null,
    productList:[],
    login:(token,userId,tokenExperation,productList)=>{

    },
    logout:()=>{}
})