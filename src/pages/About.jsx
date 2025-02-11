import React from 'react';
import multiplePizza from "../assets/MultiplePizzas.jpeg"
import "../styles/About.css";


function About(){
    return (
        <div className="about">
            <div className="aboutTop"
                style={{ backgroundImage: `url(${multiplePizza})` }}></div>
            <div className="aboutBottom">
                <h1>About us</h1>
                <p>Welcome to Dominion Pizza, where passion for great food meets warm hospitality. 
                    We take pride in serving delicious, 
                    freshly prepared dishes made from the finest ingredients. 
                    Customers satisfaction is our ultimate concern.
                </p>
            </div>
        </div>
    )
}

export default About;