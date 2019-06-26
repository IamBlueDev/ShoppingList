import React,{Component} from 'react';

import AuthContext from '../context/auth-context';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import { privateEncrypt } from 'crypto';
import './LandingPage.css';

class LandingPage extends Component{
    state = {
        creating: false,
        productsList :[],
        adding:false,
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
      fetchUserProductList(){
          this.setState({productsList:this.context.productList})

    
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
    
      modalConfirmHandler = () => {
        this.setState({ creating: false });
        const name = this.titleElRef.current.value;
        const desc = this.descEllRef.current.value;
        if(name.trim().length ===0 || desc.trim().length ===0)
        return;

        const product = {name,desc};
        console.log(product);
        const requestBody = {
            query: `
              mutation {
                createProduct(productInput: {name:"${name}", description: "${desc}"}) {
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
        
         const token = this.context.token;

          fetch('http://localhost:3001/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer' +    token
            }
          })
            .then(res => {
              if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
              }
              return res.json();
            })
            .then(resData => {
                console.log(resData.data.createProduct)
                console.log(this.state.productsList);
                this.state.productsList.push(resData.data.createProduct)
            })
            .catch(err => {
              console.log(err);
            });
        };

    
      modalCancelHandler = () => {
        this.setState({ creating: false });
      };
    
    render(){
      var items = [];
        const productsList = this.state.productsList.map(product =>{
            return(
                
                <li className="item" key={product._id}><div className="center-block prod_icon">
                        <img src="image01.jpg"/>                        
                        {/* <img src={product.img && "src/image01.jpg"}/> */}
                </div>
                <div className="prod_name">{product.name}</div>
                <div className="prod_nutrition">
                    <ul>
                    <li>{product.nut.energyKcal} Kcal</li><li>{product.nut.fat} kg</li><li>{product.nut.satFat} kg</li><li>{product.nut.carbs} kg</li><li>{product.nut.sugars} kg</li><li>{product.nut.protine} kg</li><li>{product.nut.salt} kg</li></ul></div></li>
                //energyKj // energyKcal// fat // satFat// carbs// sugars // protine // salt
            )
        })
        return(
            <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="New Product"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form>
                <div className="form-control">
                    <label htmlFor="description">Name:</label>
                    <input type="text" id="title" ref={this.titleElRef}></input>
                </div>
                <div className="form-control">
                    <label htmlFor="description">description:</label>
                    <textarea type="text" id="description" ref={this.descEllRef} ></textarea>
                </div>
            </form>
          </Modal>
        )}
            <div className="MainBox">
                <button  onClick={this.startCreateEventHandler}> Create Product</button>
                <div className="ProductsList">
                 <ul>{productsList}</ul> 
                </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LandingPage;