import React from 'react';
import './Landing.scss';
import AuthContext from '../../context/auth-context';
import ItemList from '../../components/ItemList/ItemList';
// import AuthContext from '../../context/auth-context';
import ProductList from '../../components/ProductList/ProductList';
import Editor from '../../components/Editor/Editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {refreshUserList} from '../../Util/Exports';
class Landing extends React.Component{
    static contextType = AuthContext;
    
    state = {
        test:[],
        totalAm : 0,
        
    }

    componentDidMount() {
    // this.getTotal();


      }
      callRefresh = ()=>{
        refreshUserList();
        // this.context.refreshUserList();
        // <a onClick={this.context.refreshUserList()} ><FontAwesomeIcon icon={faSync} size="2x"/></a>
        // <a onClick={this.context.emptyList()}><FontAwesomeIcon icon={faTrashAlt} size="2x" /></a>

      }
      callEmpty = ()=>{
          this.context.emptyList();
    }
      calledClick = (productID)=>{
          console.log(this.context.userId);
      const requestBody = {query:  `
        mutation {
          addProductToUser(product:"${productID}",amount:1) {
              _id,
          }
        }
      `}

      fetch('http://localhost:3001/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.context.userId,
        //   'UserId':this.context.userId,
        },

      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!');
          }
          return res.json();
        })
        .then(resData => {
            // console.log(resData);
            this.context.refreshUserList();
            console.log("cecking");
            console.log(resData)
        })
        .catch(err => {
          console.log(err);
        });
    };


    render(){
        const dummyProduct = "https://i.pinimg.com/originals/39/ca/0e/39ca0e8f1bc2a9ed642dc3e4411802a8.png"
        const dummyProducts = this.context.itemList.map((product)=>{
            return(
            <a onClick={this.calledClick.bind(this,product._id)}><span>{product.name}</span><div className="test"><img src={product.photo}></img></div></a>

            )
        })

        const loadProducts = this.context.itemList.map((product) =>{
           
            return(
                <div className="Product">
                <div className="icon">
                    <img src={!product.photo ?  "http://www.pngall.com/wp-content/uploads/2016/03/Egg-Free-Download-PNG.png": product.photo } />
                </div>
                <div className="Name">
                     <span>{product.name}</span>
                 </div>
                <div className="Nutritional">
                  
                    <a>{product.nut.energyKcal} <span>Kcal</span></a>
                    <a>{product.nut.fat} <span>KG</span></a>
                    <a>{product.nut.satFat} <span>KG</span></a>
                    <a>{product.nut.carbs} <span>KG</span></a>
                    <a>{product.nut.sugars} <span>KG</span></a>
                    <a>{product.nut.protine} <span>KG</span></a>
                    <a>{product.nut.salt} <span>KG</span></a>
                    
                </div>
            </div>
            )   
              
        })      

    return(<div className="Landing">
        {/* <ItemList/> */}
        <div className="UserIcon">
            <img src = {this.context.photo}></img>

        </div>

        <div className="Main Card">
        <div className="Card__Header">
        <span>Shopping List</span>
        <div className="Card__Options">
            <a onClick={this.callRefresh} ><FontAwesomeIcon icon={faSync} size="2x"/></a>
            <a onClick={this.callEmpty}><FontAwesomeIcon icon={faTrashAlt} size="2x" /></a>

            {/* faTrashAlt */}

        </div>
        </div>
        <div className="Card__Content" scrolling="no">
            <ProductList/>
            {/* {loadProducts} */}
        </div>

        </div>


        <div className="Recent Card">
        <div className="Card__Header">
        <span>Recent Recipes</span>
        </div>
        <div className="Card__Content" scrolling="no">
            {loadProducts}
        </div>

        </div>
        <div className="Products Card">
        <div className="Card__Header">
        <span>Products</span>
        </div>
        <div className="Card__Content" scrolling="no">
            {dummyProducts}
        </div>
        </div>

        <div>Total: {this.context.totalCal} Kcal</div>
        <Editor></Editor>
    </div>);
}
}
export default Landing;