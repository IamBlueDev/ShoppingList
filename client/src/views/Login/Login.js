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
    const { socket, provider } = this.props

console.log(socket);
  }
  state={
    user:{},
      projects: [],
  }
      manage = () =>{
      fetch("http://localhost:3001/user")    
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ projects: data.data });
        console.log(data);
        this.context.login(data.socialID,data.Photo,data.ProductList)
        console.log(this.context);
      })
      .catch(err => console.log(err));
     }
    render(){
        return(
            <div className="Login Card">
       <div className="Card__Header">
         <span>Login</span>
         <div className="Card__Social">
         {/* Social links here */}
         <a><FontAwesomeIcon icon={faFacebookF} size="2x" onClick={this.manage}/></a>
         <a><FontAwesomeIcon icon={faGoogle} size="2x"/></a>

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