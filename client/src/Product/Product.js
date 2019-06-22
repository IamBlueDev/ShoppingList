import React from 'react';
import './Product.css';
const product = (props)=>{
    return (<div className="Product">
        <h3>Product: {props.prodname}</h3>
        <p>Amount: {props.prodamount}</p>        
        {props.showNut==="true" ?<div id="NutInfo">
    <table className="Container">
<tr>

        <p>TotalCal: {props.prodcal}</p>
        <p>Energy: {props.eng}</p>        
        <p>Fats: {props.fatInf}</p>
</tr>
<tr>

        <p>Sat: {props.satfatInf}</p>
        <p>Sugars: {props.sugarsInf}</p>
        <p>Proteins: {props.protInf}</p>
</tr>
<tr>

        <p>Salt: {props.saltInf}</p>
        <p>Carbs: {props.carbInf}</p>        
</tr>
    </table>
        </div> : <p></p>
        }
        <button onClick={props.onHandover}>Edit</button>   
        <button onClick={props.onHelpMe}>ShowNut</button>   
        <button onClick={props.onHelpMe}>ShowNut</button>   
        
        </div>
            );

}

export default product;