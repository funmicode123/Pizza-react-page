import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import "../NavBar/NavBar.css";
import Logo from "../../assets/pizzaLogo.png"

const NavBar = () => {
  const[openLink, setOpenLink] = useState(false);
  const toggleNavBar = ()=>{
      setOpenLink(!openLink);
  };
  return (
    <div class = "navBar">
        <div className="left-navbar" id = {openLink ? "open": "close"}>
          <img src={Logo} alt="Logo" />
          
        </div>
      
        <div className="right-navbar">
          <Link to = "/">Home</Link>
          <Link to = "/menu">Menu</Link>
          <Link to = "/about">About</Link>
          <Link to = "/contact">Contact</Link>
          <div class = "accessButton">
            <Link to = "/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default NavBar
