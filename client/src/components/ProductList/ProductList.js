import React, { Component } from 'react';
import AuthContext from '../../context/auth-context';

export default class ProductList extends Component {
    static contextType = AuthContext;  

    state={
        productList:[]
    }

    componentDidMount() {
        // this.checkData();
        this.getProducts();
    
          }

          checkData(){
            //   console.log(this.context.productList);
            //   console.log(this.context.itemList)
              var Tablewithitems = [];

              if(this.context.itemList.length > 0){

              const thismap = this.context.productList.map(product =>{
                  console.log("TESTING : "+product);
                  console.log(product.product);
                //   console.log(this.context.itemList[0]);
                 var checkme = this.context.itemList.find((element) =>{
                      return  element._id === product.product;
                    //   console.log(element.name);
                  });

                  var check = {_id : product._id, product: checkme, amount: product.amount};
                  Tablewithitems.push(check);
                  console.log(Tablewithitems);
                })
                // this.setState({
                //   productList:Tablewithitems,
                // })
            }
                // this.setState({
                //   productList:Tablewithitems,
                // })
            
          }
          getProducts(){
            
            const requestBody = {query:  `
            query {
                getSocialProducts(socialId:"${this.context.userId}") {
                  productList
              }
            }
          `}
          }
          render(){
              // console.log(this.context.itemList);
            //   var test = this.checkData();
              const loadProducts = this.context.productList.map(main => {
                  // console.log(main.product);
                  var product = main.product;
                  return(
                //   <div> {product.product.name && <div>{product.product.name}</div>}</div>
                  <div> {product.name && 
                  
                  
                  

                <div className="Product">
                <div className="icon">
                    <img src={!product.photo ?  "http://www.pngall.com/wp-content/uploads/2016/03/Egg-Free-Download-PNG.png": product.photo } />
                </div>
                <div className="Name">
                     <span>{product.name} x {main.amount}</span>
                 </div>
                <div className="Nutritional">
                   
                   <a>{product.nut.energyKcal } <span>Kcal</span></a>
                     <a>{product.nut.fat} <span>KG</span></a>
                  <a>{product.nut.satFat} <span>KG</span></a>
                    <a>{product.nut.carbs} <span>KG</span></a>
                    <a>{product.nut.sugars} <span>KG</span></a>
                   <a>{product.nut.protine} <span>KG</span></a>
                     <a>{product.nut.salt} <span>KG</span></a>
                    
                </div>
            </div>
}
</div>
                  )
              })
        return(
            <div>
           {loadProducts}
             {/* <div onClick={this.context.refreshUserList}> Refresh</div> */}
            </div>
        )
    }
}
