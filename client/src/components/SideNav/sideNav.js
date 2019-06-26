import React from 'react';
import './sideNav.scss'

const SideNav = (props)=>{

        return(
            <div className="SideNav_Main">
                <div className="Icon">
                <h1>S</h1>
                </div>

                <div className="SideNav_Item">Basket</div>
                <div className="SideNav_Item">Recipes</div>

            
            <div className="SideNav_Item Bottom">Settings</div>
            </div>
        )
    }
export default SideNav;