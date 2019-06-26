import React,{Component} from 'react';
import {Button} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";

class DevPage extends Component {
      state={
        show : true,
        toggleShow : true,
      }
    render(){
        return (
            <Toast show={this.state.show} onClose={() => this.setState({show:!this.state.show})}>
              <Toast.Header>
                <strong className="mr-auto">React-Bootstrap</strong>
              </Toast.Header>
              <Toast.Body><p>Hello!</p></Toast.Body>
            </Toast>
          );
        }
}

export default DevPage;