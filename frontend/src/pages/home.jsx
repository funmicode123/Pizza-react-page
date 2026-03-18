import React from 'react'
import {Link} from 'react-router-dom'
import backImage from '../assets/pizza.jpeg'
import '../styles/home.css'
const home = () =>{
  return (
    <div className='home' style={{backgroundImage: `URL(${backImage})` }}>
      <div className="homeContainer">
        <span>Dominion Pizza</span>
        <p>Pizza with a special twist!</p>
        <Link to ="/menu">
          <button>Order Now</button>
        </Link>

      </div>
    </div>
  )
}

export default home;
