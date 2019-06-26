import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';


import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import MainBox from './components/mainBox';
import AuthContext from './context/auth-context';
import DevPage from './pages/Dev'

// import './App.css';


class App extends Component {
  state={
    token : null,
    userId : null,
    productList:[],
  }

  login = (token,userId,tokenExpiration,productList)=>{
    this.setState({
      token:token,
      userId:userId,
      productList:productList,
    })
  }

  logout = (token,userId,tokenExpiration)=>{
    this.setState({
        token:null,
        userId:null
      })
  }
  render() {
    return (
      <BrowserRouter>
      <AuthContext.Provider value={{
        token:this.state.token,
        userId:this.state.userId,
        login : this.login,
        logout : this.logout,
        productList : this.state.productList,
        }}>

        <Switch>
          {/* {!this.state.token&&<Redirect from="/" to="/auth" exact />}
          {this.state.token&&<Redirect from="/auth" to="/" exact />}
          
          <Route path="/auth" component={Auth} />
          {this.state.token && <Route path="/" component={LandingPage} />} */}
          <Route path="/" component={LandingPage} />

        </Switch>
      </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;