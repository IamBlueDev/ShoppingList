import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import logo from './logo.svg';
// import './App.css';
import './styles/base.scss';
import AuthContext from './context/auth-context';
import Login from './views/Login/Login';
import Landing from './views/Landing/Landing';
class App extends React.Component {
    state={
    userId : null,
    productList:[],
    photo:"",
  }
  login = (userId,photo,productList)=>{
    this.setState({
      userId:userId,
      photo:photo,
      productList:productList,
    })
  }
render(){
  return (
    <BrowserRouter>
     <AuthContext.Provider value={{
        userId:this.state.userId,
        login : this.login,
        logout : this.logout,
        photo:this.state.photo,
        productList : this.state.productList,
        }}>

        <Switch>
          {!this.state.userId&&<Redirect from="/" to="/login" exact />}
          {this.state.userId&&<Redirect from="/login" to="/" exact />}
          
          <Route path="/login" component={Login} />
          {this.state.userId && <Route path="/" component={Landing} />}

        </Switch>
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
