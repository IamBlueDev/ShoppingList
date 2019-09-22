import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import logo from './logo.svg';
// import './App.css';
import './styles/base.scss';
import AuthContext from './context/auth-context';
import Login from './views/Login/Login';
import ItemList from './components/ItemList/ItemList';

import Landing from './views/Landing/Landing';
class App extends React.Component {
    state={
    userId : null,
    productList:[],
    itemList:[],
    photo:"",
    totalCal:0,
  }
  login = (userId,photo,productList)=>{
    this.setState({
      userId:userId,
      photo:photo,
      productList:productList,
    })
  }
  logout = ()=>{
    console.log("logged out")
  }
  setList = (newList)=>{

    this.setState({
      itemList:newList,
    })
  }
  updateUserList = (updatedList)=>{
    this.setState({
      productList:updatedList,
    })
  }

  getTotal = async (productList)=>{
    if(productList === 'undefined'){
      console.log("Not defined.")
    }
      else{
    let currentTotal = this.state.totalAm;
    let newTotal=0;
    for (const [index, value] of productList.entries()) {
        newTotal = newTotal + (value.product.nut.energyKcal * value.amount);
      }
   this.setState({totalCal:newTotal});
}
  }
  emptyList = async () =>{
    console.log("dwdw");
  }
  refreshUserList= async ()=>{
      const requestBody = {query:  `
      query{
        getSocialProducts(socialId:"10218054492707251"){
          _id
          product{
            name,
            description,
            photo,
            nut {
              energyKj
              energyKcal
              fat
              satFat
              carbs
              sugars
              protine
              salt
            },
          },
          amount
          }
      }
    `}

    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token',
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
          // console.log("check"+resData.data.getSocialProducts)
          
          this.setState({productList : resData.data.getSocialProducts});
          this.getTotal(resData.data.getSocialProducts);
      })
      .catch(err => {
        console.log(err);
      });
    

  }
  onUnload(){
console.log("called")
  }
  componentWillMount() {  
    if (window.performance) {
      if (performance.navigation.type == 1) {
        this.refreshUserList();
        this.onUnload();
      } else {
      }
    }
    // window.addEventListener("beforeunload", this.onUnload);
    console.log("mounted");
    // this.refreshUserList();
  }
render(){
  return (
    <BrowserRouter>
     <AuthContext.Provider value={{
        userId:this.state.userId,
        login : this.login,
        logout : this.logout,
        setList : this.setList,
        updateUserList : this.updateUserList,
        refreshUserList: this.refreshUserList,
        photo:this.state.photo,
        productList : this.state.productList,
        itemList: this.state.itemList,
        totalCal: this.state.totalCal,
        emptyList: this.emptyList,
        }}>

        <Switch>
          {!this.state.userId&&<Redirect from="/" to="/login" exact />}
          {this.state.userId&&<Redirect from="/login" to="/" exact />}
          
          <Route path="/login" component={Login} />
          {this.state.userId && <Route path="/" component={Landing} />}
        </Switch>
          <ItemList/>
      </AuthContext.Provider>
    </BrowserRouter>
    // <div className="App">
    //   {/* <Landing></Landing> */}
    //  <Login/>
    // </div>
  );
}
}
export default App;
