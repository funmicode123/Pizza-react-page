import React from 'react';
import { useCart } from '../helpers/CartContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../helpers/supabaseClient';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();
    const [isCheckingOut, setIsCheckingOut] = React.useState(false);

    const handleCheckout = async () => {
        try {
            setIsCheckingOut(true);

            // 1. Ensure user is logged in
            const { data: { session } } = await supabase.auth.getSession();
            if (!session || !session.user) {
                alert('Please login to checkout.');
                navigate('/login');
                setIsCheckingOut(false);
                return;
            }
            const user = session.user;
            const token = session.access_token;

            // 2. Format items for the backend
            const orderItems = cart.map(item => ({
                pizzaId: item.id,
                quantity: item.quantity
            }));

            // 3. Create the order & get Paystack initialization
            const response = await fetch(`http://localhost:8081/api/orders/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ items: orderItems })
            });

            if (!response.ok) throw new Error("Order creation failed on the backend");

            const paystackResponse = await response.json();

            // 4. Redirect user to Paystack generated URL
            if (paystackResponse.data && paystackResponse.data.authorization_url) {
                window.location.href = paystackResponse.data.authorization_url;
            } else {
                throw new Error("Paystack URL not found in response");
            }

        } catch (error) {
            console.error("Checkout error:", error);
            alert("There was an error initializing checkout. Please try again.");
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="cart">
            <h1>Your Shopping Cart</h1>
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                    <button onClick={() => navigate('/menu')}>Go to Menu</button>
                </div>
            ) : (
                <div className="cart-container">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.imageUrl} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>${item.price}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Summary</h2>
                        <div className="summary-item">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            className="checkout-btn"
                            onClick={handleCheckout}
                            disabled={isCheckingOut || cartTotal === 0}
                        >
                            {isCheckingOut ? 'Loading Payment...' : 'Checkout'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
