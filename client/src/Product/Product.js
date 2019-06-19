import React from 'react';
import './Product.css';
const product = (props)=>{
    return (<div className="Product">
        <p>Product: {props.prodname}</p>
        <p>Amount: {props.prodamount}</p>        
        {props.showNut==="true" ?<div id="NutInfo">
        <p>TotalCal: {props.prodcal}</p>
        <p>Energy: {props.eng}</p>        
        <p>Fats: {props.fatInf}</p>
        <p>Sat: {props.satfatInf}</p>
        <p>Sugars: {props.sugarsInf}</p>
        <p>Proteins: {props.protInf}</p>
        <p>Salt: {props.saltInf}</p>
        <p>Carbs: {props.carbInf}</p>        
        </div> : <p></p>
        }
        <button onClick={props.onHandover}>SaveData</button>   
        <button onClick={props.onHelpMe}>ShowNut</button>   
        
        </div>
            );

}

export default product;