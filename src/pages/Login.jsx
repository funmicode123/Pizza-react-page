import React from 'react'
import PizzaLeft from '../assets/pizzaLeft.jpg';
import '../styles/Login.css';

function Login(){
    return (
        <div className ='login'>
            <div className="leftSide" style={{ backgroundImage: `url(${PizzaLeft})` }}></div>
                        <div className="loginRightSide">
                            <form id="login-form" method="POST">
                                <label htmlFor="name">Username</label>
                                <input name="name" type="text" placeholder="Enter username..." />
                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" placeholder="Enter password..." />
                                <button type = "submit">Login</button>
                            </form>
                        </div>
            
        </div>
    )
}

export default Login