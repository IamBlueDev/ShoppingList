import React from 'react';

export default React.createContext({
    token:null,
    userId:null,
    productList:[],
    photo:"",
    login:()=>{

    },
    logout:()=>{}
})