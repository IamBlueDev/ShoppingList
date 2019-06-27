import React,{Component} from 'react';

import AuthContext from '../context/auth-context';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import { privateEncrypt } from 'crypto';
import './LandingPage.scss';
import SideNav from '../components/SideNav/sideNav';

class LandingPage extends Component{
  state = {
    creating: false,
    productsList :[],
    ObtainedproductsList :[],
    shopOpen:true,
    randomI:0,
    inDev : true,
  };

static contextType = AuthContext;  

  constructor(props){
    super(props);
    this.titleElRef = React.createRef();
    this.descEllRef = React.createRef();

  }  

  
  componentDidMount() {
    this.fetchProducts();
  // this.fetchUserProductList();
  }

    fetchProducts(){
      setTimeout(() => {
 
      const requestBody = {
        query: `
        query {
          products {
            _id
            name
            description
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
              this.setState({ productsList: products });
            })
            .catch(err => {
              console.log(err);
            });
          } , 1500);
    }
          
    startCreateEventHandler = () => {
      this.setState({ creating: true });
    };
    OpenStore = () =>{
      this.setState(
        {shopOpen:!this.state.shopOpen}
      )
    }
    removeObtainedProduct = async (args) =>{
      console.log("Products: " )
      console.log( this.state.productsList)
      console.log("Obtained: " )
      console.log(this.state.ObtainedproductsList)
      const productsList = [...this.state.productsList];
      await this.state.ObtainedproductsList.splice(args._id,1);
      productsList.push(args);
      this.setState(
        {productsList:productsList}
      )
    }
    addObtainedProduct = async (args) =>{
      console.log("Products: " )
      console.log( this.state.productsList)
      console.log("Obtained: " )
      console.log(this.state.ObtainedproductsList)
      const obtainedproductsList = [...this.state.ObtainedproductsList];
      const productsList = [...this.state.productsList];
      if(obtainedproductsList.includes({_id:args._id},0))
        console.log("????")
      await productsList.splice(args.name,1);
      obtainedproductsList.push(args);
      this.setState(
        {ObtainedproductsList:obtainedproductsList,
        productsList:productsList
        }
      )
      console.log(args._id)

    }

    render(){
      const productsList = this.state.productsList.map(product =>{
            return(                
                <li key={product._id}>
                  <div className="item" >
                  <div className="icon">
                        <img src="image01.jpg"/>                        
                        {/* <img src={product.img && "src/image01.jpg"}/> */}
                </div>
                <div className="item_title"onClick={this.addObtainedProduct.bind(this,product)}>
              <p>{product.name}</p> 
              <p>{product.description}</p> 
                </div>
                <div className="item_nut">
                    <ul>
                    <li>{product.nut.energyKcal} Kcal</li><li>{product.nut.fat} kg</li><li>{product.nut.satFat} kg</li><li>{product.nut.carbs} kg</li><li>{product.nut.sugars} kg</li><li>{product.nut.protine} kg</li><li>{product.nut.salt} kg</li></ul></div>
                  </div>
               </li> //energyKj // energyKcal// fat // satFat// carbs// sugars // protine // salt
            )
        })

        const ObtainedproductsList = this.state.ObtainedproductsList.map(product =>{
          
          return(
            <li key={product._id}>
                  <div className="item">
                  <div className="icon">
                        <img src="image01.jpg"/>                        
                        {/* <img src={product.img && "src/image01.jpg"}/> */}
                </div>
                <div className="item_title" onClick={this.removeObtainedProduct.bind(this,product)}>
              <p>{product.name}</p> 
              <p>{product.description}</p> 
                </div>
                <div className="item_nut">
                    <ul>
                    <li>{product.nut.energyKcal} Kcal</li><li>{product.nut.fat} kg</li><li>{product.nut.satFat} kg</li><li>{product.nut.carbs} kg</li><li>{product.nut.sugars} kg</li><li>{product.nut.protine} kg</li><li>{product.nut.salt} kg</li></ul></div>
                  </div>
               </li> //energyKj // energyKcal// fat // satFat// carbs// sugars // protine // salt
          )
          })
      return(
        <div className="Landing_Root">

        <SideNav></SideNav>
        {!this.state.shopOpen ? <div className="Landing_Content">
          <div className="Container LF">
        <div className="Title">
        <h1>You have:</h1>
        </div>
        <div className="itemContainer">
          <ol>{ObtainedproductsList}</ol>
          
        {/* <h1>This is the item needed content</h1> */}
        </div>

        </div>
        <div className="Container">
          <div className="Title">
        <h1>You need:</h1>

          </div>
          <div className="itemContainer">
           <ol> {productsList}</ol>


          </div>

        </div>
        <button onClick={this.OpenStore}>Shop</button>
        </div>
        : <div className="Landing_Shop">
          <div className="Title">
            Add things to your shopping list
            <input type="text"/>
            <label>Search:</label>
            </div>
            <div className="itemContainer">
            <ul>
            {productsList}
            </ul>

            </div>
        </div>
        }
      
        <div className="Button Shop">

        </div>
        </div>
    


        // <h1>d</h1>
      )
    }
}

export default LandingPage;