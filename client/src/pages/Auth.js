import React, { Component } from 'react';
import MainBox from '../components/mainBox';
import AuthContext from '../context/auth-context';
class AuthPage extends Component {
  state = {
    isLogin : true,
  }
  static contextType = AuthContext;

  constructor(props){
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();

  }
  
  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  sumbitHandler = event =>{
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    if(email.trim().length === 0 || password.trim().length === 0)
      return;
    
      let requestBody = {
        query: `
          query {
            login(email: "${email}", password: "${password}") {
              userId
              token
              tokenExpiration
              productList{
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
          }
        `
      };
  
      if (!this.state.isLogin) { // If we are trying to register a client
        requestBody = {
          query: `
            mutation {
              createUser(userInput: {email: "${email}", password: "${password}"}) {
                _id
                email
              }
            }
          `
        };
      }
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
          if(resData.data.login.token){
            this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExperation,resData.data.login.productList);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };


    render(){
      return(
        <div className="MainBox">

        <form className ="user-form" onSubmit={this.sumbitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
        </form>
        </div>
      );
    }
  // render() {
  //   return (
  //     <div className="MainBox">

  //     <form onSumbit={this.sumbitHandler}>
  //       <div className ="form-control">
  //         <label>Email:</label>
  //         <input type="email" id="email" ref={this.emailEl}></input>
  //       </div>
  //       <div className ="form-control">
  //         <label>Email:</label>
  //         <input type="password" id="password"ref={this.passwordEl}></input>
  //       </div>
  //       <div className ="form-actions">
  //       <button type="signup" onClick={this.sumbitHandler}> Signupp</button>
  //       <button type="sumbit"> sumbit</button>

  //       </div>
        
  //       </form>
  //     </div>

  //   );
    
  // }
}

export default AuthPage;