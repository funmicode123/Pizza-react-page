import React from 'react'
import {PizzaList} from '../helpers/PizzaList.jsx';
import Menuitems from '../components/menuItems/Menuitems.jsx';
import '../styles/Menu.css';
function menu() {
  return (
    <div className="menu">
        <h1 className="menuTitle">Our Menu</h1>
        <div className="menuList">{PizzaList.map((menuItem, key) => {
            return<Menuitems key = {key} image={menuItem.image} name={menuItem.name} price={menuItem.price} />;

        })}
        </div>

    </div>
);
}

export default menu
