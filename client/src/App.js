import React, { Component } from 'react';
import './App.css';
import './Product/Product';
import Product from './Product/Product';


class App extends Component {
  state = {users: [],
          test:[],
          textD: 'HelloWorld',
          showinfo: 'false',
  }

  componentDidMount() {
    fetch('/users/')
      .then(res => res.json())
      .then(users => this.setState({ users }));


    fetch("/productname/")
      .then(res => res.json())
      .then(result => {       
        this.setState({test: result});
      });
    }
     isInt(value) {
      var x = parseFloat(value);
      return !isNaN(value) && (x | 0) === x;
    }


    onChangeEventHandler  = (event) =>{ 
      if(this.isInt(event.target.value)){
      fetch("/product/"+event.target.value)
      .then(res => res.json())
      .then(result => {       
        this.setState({test: result});


      });
    }else{
      fetch("/productname/"+event.target.value)
      .then(res => res.json())
      .then(result => {       
        this.setState({test: result});});
    }
  }

  SaveData = (props) =>{
    this.setState({textD : props.Product_name})

    fetch("/insert/", {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prodName: props.Product_name,
    prodamount:props.Item_ammount,
    prodCal:props.Item_Cal

  
  })
}).then(res=>res.json())
  .then(res => console.log(res));
 
  }


  onChangeShowNut = (props) =>{
    console.log(props.keyToUse)
    const text = this.state.test
    console.log(text)
    if( text[props.keyToUse-1].showinfo === 'false')
    text[props.keyToUse-1].showinfo = 'true';
    else
    text[props.keyToUse-1].showinfo = 'false';
    this.setState({test:text})

  }

    render() {
//var arraySorted = this.state.test.map();
      return (
      <div className="App">
        <h1>Users</h1>
      <input onChange={this.onChangeEventHandler}/>
      {this.state.test.map(prod => <Product key= {prod.keyToUse} 
      prodname= {prod.Product_name} 
      prodamount={prod.Item_ammount}
      prodcal={prod.Item_Cal}
      showNut={prod.showinfo}
      onHandover={this.SaveData.bind(this,prod)}
      onHelpMe={this.onChangeShowNut.bind(this,prod)}
      />)}
    {this.state.textD}
      <button onClick={this.SaveData}>Test</button>
        
        
        
      </div>
    );
  }
}

// {this.state.users.map(user =>
//   <div key={user.Id}>Username: {user.username}</div>
//   )}
// <div>Product_Name: {user.Product_name}, Amount: {user.Item_ammount}</div>)}
export default App;