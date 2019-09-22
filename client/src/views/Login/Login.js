import React from 'react';
import "./Login.scss"
import io from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle,faFacebookF } from "@fortawesome/free-brands-svg-icons";
import AuthContext from '../../context/auth-context';
const socket= io("http://localhost:3001/auth/facebook");
// const element = <FontAwesomeIcon icon={faCoffee} />
class Login extends React.Component{
  static contextType = AuthContext;  

  componentDidMount() {
    this.manage();
    const { socket, provider } = this.props

// console.log(socket);
  }
  state={
    user:{},
      products: [],
  }
      manage = () =>{
      fetch("http://localhost:3001/user")    
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ products: data.data });
        console.log(data);
        // console
        this.context.login(data.socialID,data.Photo,data.ProductList)
        // this.context.refreshUserList();
        // console.log(this.context);
      })
      .catch(err => console.log(err));
     }
    render(){
        return(
            <div className="Login Card">
       <div className="Card__Header">
         <span>Login</span>
         <div className="Card__Options">
         {/* Social links here */}
         <a href="http://localhost:3001/auth/facebook"><FontAwesomeIcon icon={faFacebookF} size="2x" onClick={this.manage}/></a>
         <a href="http://localhost:3001/auth/google"><FontAwesomeIcon icon={faGoogle} size="2x" onClick={this.manage}/></a>

         </div>
       </div>
      <div className="Card__Content">
        <p>Or.. Enter details below.</p>
        <label>Email:</label>
        <div>

        <input>
        {/* <hr/> */}
        </input>
        </div>
        <label>Password:</label>
        <div>

        <input/>
        </div>
      </div>
      <div className="Card__Footer">
        <button>
          Register
        </button>
      </div>
     </div>
        )
    }
}
export default Login;