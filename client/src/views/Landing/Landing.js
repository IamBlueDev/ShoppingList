import React from 'react';
import './Landing.scss';
import AuthContext from '../../context/auth-context';

class Landing extends React.Component{
    static contextType = AuthContext;
    render(){
        console.log(this.context.photo);  
        console.log("#^^^")
    return(<div className="Landing">
        <div className="UserIcon">
            <img src = {this.context.photo}></img>

        </div>
        <div className="Main Card">
        <div className="Card__Header">
        <span>Shopping List</span>
        </div>
        <div className="Card__Content" scrolling="no">
            <div className="Product">
                <div className="icon">
                    <img src="2"/>
                </div>
                <div className="Name">
                     <span>Name goes here</span>
                 </div>
                 
                <div className="Nutritional">
                    <a>0 <span>Kcal</span></a>
                    <a>0 <span>KG</span></a>
                    <a>0 <span>KG</span></a>
                    <a>0 <span>KG</span></a>
                    <a>0 <span>KG</span></a>
                    <a>0 <span>KG</span></a>
                    <a>0 <span>KG</span></a>


                   {/* <a>energyKj</a> 
                   <a>energyKcal</a> 

                   <a>fat</a> 

                   <a>satFat</a> 

                   <a>carbs</a> 

                   <a>sugars</a> 
                   <a>protine</a> 
                   <a>salt</a>  */}

                </div>
            </div>

            
        </div>

        </div>
    </div>);
}
}
export default Landing;