import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('pizza_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('pizza_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (pizza) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === pizza.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...pizza, quantity: 1 }];
        });
    };

    const removeFromCart = (pizzaId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== pizzaId));
    };

    const updateQuantity = (pizzaId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === pizzaId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
