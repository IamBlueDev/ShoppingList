import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
const requestBody = {
    query: `
    query {
      products {
        _id
        name
        description
        photo
        nut{
          energyKj
          energyKcal
          fat
          satFat
          carbs
          sugars
          protine
          salt
        }
      }
    }
    `
  };

  export class refreshItemList extends Component  {
     static contextType = AuthContext;  
     console.log("called");
     render(){
         return(<div>

         </div>)
     }
}