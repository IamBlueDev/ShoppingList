import React, { Component } from 'react';
import './Editor.scss';
import AuthContext from '../../context/auth-context';

export default class Editor extends Component {
  static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {

        };
      }
      saveData = () =>{
          console.log(parseFloat(this.state.carbs));
          let test = "energyKcal:"+parseFloat(this.state.energyKcal)+",fat:"+parseFloat(this.state.Fat)+","
          let value = 2.1;
          console.log(test);
          const requestBody = {query: `
          mutation {
            createProduct(productInput:{name:"${this.state.name}", description:"${this.state.description}"},
            nutInput:
                        {energyKcal:${parseFloat(this.state.energyKcal)},
                        fat:${parseFloat(this.state.Fat)},
                        satFat:${parseFloat(this.state.satFat)},
                        carbs:${parseFloat(this.state.carbs)},
                        sugars:${parseFloat(this.state.sugars)},
                        protine:${parseFloat(this.state.protine)},
                        salt:${parseFloat(this.state.salt)}},photo:"${this.state.photo}")
        		{
              name
            }
      }
          `}
    //     const requestBody = {query:  `
    //     mutation {
    //         createProduct(productInput:{name:"${this.state.name}", description:"${this.state.description}"},
    //         nutInput:
    //         {energyKcal:${parseFloat(this.state.energyKcal)},
    //         fat:${parseFloat(this.state.fat)},
    //         satFat:${parseFloat(this.state.satFat)},
    //         carbs:${parseFloat(this.state.carbs)},
    //         sugars:${parseFloat(this.state.sugars)},
    //         protine:${parseFloat(this.state.protine)},
    //         salt:${parseFloat(this.state.salt)}})
    //          {
    //             name,
    //          }
    //       }
    //   `}

      fetch('http://localhost:3001/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.context.userId,
        //   'UserId':this.context.userId,
        },

      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Bad Request');
          }
          return res.json();
        })
        .then(resData => {
            // console.log(resData);
            this.context.refreshUserList();
            // console.log("cecking");
            console.log(resData)
        })
        .catch(err => {
          console.log(err);
        });
      }
    handleChange = (event) =>{
        let item  = event.target.className;
        const itemv = event.target.value;
        this.setState({[item] : itemv})

    }
    render(){
        // console.log(this.state);
        return(
            <div className ="Editor">
                <div className="column">
                <label>Name:</label>
                <input className="name" onChange={this.handleChange}></input>
                <label>description:</label>
                <input className="description"onChange={this.handleChange}></input>

                <label>Photo (URL)</label>
                <input className="photo" onChange={this.handleChange}/>
               
    </div>
                <div className="column"> 

                <label>Nut:</label>
                <div className="item">
<label>energyKcal</label>
<input className="energyKcal" onChange={this.handleChange}/>
</div>
                <div className="item">

<label>Fat</label>
<input className="Fat" onChange={this.handleChange}/>
</div>
                <div className="item">

                <label>satFat</label>
                <input className="satFat" onChange={this.handleChange}/>
                </div>
               
</div>
<div className="column">
<div className="item">

<label>carbs</label>
<input className="carbs" onChange={this.handleChange}/>
</div>           
     <div className="item">

<label>sugars</label>
<input className="sugars" onChange={this.handleChange}/>
</div>            
    <div className="item">

<label>protine</label>
<input className="protine" onChange={this.handleChange}/>
</div>               
 <div className="item">

<label>salt</label>
<input className="salt" onChange={this.handleChange}/>
</div>   
</div>
            <div className="Button" onClick={this.saveData}>Save</div>
            </div>
        )
    }
}