import React, { Component } from 'react';
import AuthContext from '../../context/auth-context';
const updateUserProducts = (socialID,product)=> {
    console.log(socialID);
    //pass ammount here too 
   return `
      mutation {
        addProductToUser(product:"${product}") {
            _id,
            productList,
        }
      }
    `
  };   
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




export default class ItemList extends Component {
  static contextType = AuthContext;  
    
    componentDidMount() {
        this.fetchProducts();
      }
      checkData(){
        //   console.log(this.context.productList);
        //   console.log(this.context.itemList)
          var Tablewithitems = [];

          if(this.context.itemList.length > 0){

          const thismap = this.context.productList.map(product =>{
              // console.log("TESTING : "+product);
              // console.log(product.product);
            //   console.log(this.context.itemList[0]);
             var checkme = this.context.itemList.find((element) =>{
                  return  element._id === product.product;
                //   console.log(element.name);
              });

              var check = {_id : product._id, product: checkme, amount: product.amount};
              Tablewithitems.push(check);
              // console.log(Tablewithitems);
            })
            // this.setState({
            //   productList:Tablewithitems,
            // })
        }
// return Tablewithitems;
                  this.context.updateUserList(Tablewithitems);
        
      }

    fetchProducts = () => {
        setTimeout(() => {
        fetch('http://localhost:3001/graphql', {
            method: 'POST',
                  body: JSON.stringify(requestBody),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                .then(res => {
                  if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                  }
                  return res.json();
                })
                .then(resData => {
                  const products = resData.data.products;
                  this.context.setList(products);
                  // console.log(this.context.itemList)
                  // console.log(updateUserProducts("test","e29e22e22"));
                  // this.checkData();
                  
                  // this.context.updateUserList(this.checkData());
                })
                .catch(err => {
                  console.log(err);
                });
              } , 1500);
        }


    render(){
        return(
            <div>
                
            </div>
        )
    }
}