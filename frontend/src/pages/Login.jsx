import React, { useState } from 'react';
import PizzaLeft from '../assets/pizzaLeft.jpg';
import { supabase } from '../helpers/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let result;
        if (isSignUp) {
            result = await supabase.auth.signUp({ email, password });
            if (!result.error && result.data?.user) {
                try {
                    await fetch('http://localhost:8081/api/users/signup', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: result.data.user.id,
                            email: result.data.user.email,
                            firstName: firstName,
                            lastName: lastName
                        })
                    });
                    alert('Signup successful! Check your email for the login link.');
                } catch (err) {
                    console.error("Backend sync failed:", err);
                    alert("Signup successful, but failed to sync with our database.");
                }
            }
        } else {
            result = await supabase.auth.signInWithPassword({ email, password });
            if (!result.error) navigate('/profile');
        }

        if (result.error) alert(result.error.message);
        setLoading(false);
    };

    const handleOAuthLogin = async (provider) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: "http://localhost:5173/profile",
            }
        });
        if (error) alert(error.message);
    };

    return (
        <div className='login'>
            <div className="leftSide" style={{ backgroundImage: `url(${PizzaLeft})` }}></div>
            <div className="loginRightSide">
                <h1>{isSignUp ? 'Create an Account' : 'Welcome Back'}</h1>
                <form id="login-form" onSubmit={handleSubmit}>
                    {isSignUp && (
                        <>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                name="firstName"
                                type="text"
                                placeholder="Enter first name..."
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required={isSignUp}
                            />
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                name="lastName"
                                type="text"
                                placeholder="Enter last name..."
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required={isSignUp}
                            />
                        </>
                    )}
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading
                            ? (isSignUp ? 'Signing up...' : 'Logging in...')
                            : (isSignUp ? 'Sign Up' : 'Login')}
                    </button>
                    <p className="toggle-auth" onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}>
                        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                    </p>
                </form>

                <div className="oauth-login">
                    <p>Or login with</p>
                    <div className="oauth-buttons">
                        <button type="button" className="google-btn" onClick={() => handleOAuthLogin('google')}>
                            <FontAwesomeIcon icon={faGoogle} /> Google
                        </button>
                        <button type="button" className="apple-btn" onClick={() => handleOAuthLogin('apple')}>
                            <FontAwesomeIcon icon={faApple} /> Apple
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
