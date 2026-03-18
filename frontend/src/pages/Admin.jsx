import React, { useState, useEffect } from 'react';
import { supabase } from '../helpers/supabaseClient';
import '../styles/Admin.css';

const Admin = () => {
    const [pizzas, setPizzas] = useState([]);
    const [newPizza, setNewPizza] = useState({ name: '', price: '', description: '', imageUrl: '' });
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch pizzas from backend
            try {
                const response = await fetch('http://localhost:8080/api/pizzas');
                const data = await response.json();
                setPizzas(data);
            } catch (error) {
                console.error('Error fetching pizzas:', error);
            }
        };
        fetchData();

        // Setup real-time listener or polling for orders
        const pollOrders = setInterval(async () => {
            // In a real app, this would be a WebSocket or Server-Sent Events
            // For now, we'll just simulate the monitor
        }, 5000);

        return () => clearInterval(pollOrders);
    }, []);

    const handleAddPizza = async (e) => {
        e.preventDefault();
        const { data: { session } } = await supabase.auth.getSession();

        try {
            const response = await fetch('http://localhost:8080/api/pizzas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify(newPizza)
            });
            if (response.ok) {
                alert('Pizza added successfully!');
                setNewPizza({ name: '', price: '', description: '', imageUrl: '' });
                // Refresh list
            }
        } catch (error) {
            alert('Error adding pizza');
        }
    };

    return (
        <div className="admin">
            <h1>Admin Dashboard</h1>
            <div className="admin-container">
                <section className="add-pizza">
                    <h2>Add New Pizza</h2>
                    <form onSubmit={handleAddPizza}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newPizza.name}
                            onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newPizza.price}
                            onChange={(e) => setNewPizza({ ...newPizza, price: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={newPizza.description}
                            onChange={(e) => setNewPizza({ ...newPizza, description: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newPizza.imageUrl}
                            onChange={(e) => setNewPizza({ ...newPizza, imageUrl: e.target.value })}
                        />
                        <button type="submit">Add Pizza</button>
                    </form>
                </section>
                <section className="order-monitor">
                    <h2>Real-time Order Monitor</h2>
                    <div className="order-list">
                        {orders.length === 0 ? (
                            <p>No active orders currently being processed via Kafka...</p>
                        ) : (
                            orders.map(order => (
                                <div key={order.id} className="order-item">
                                    <span>Order #{order.id.substring(0, 8)}</span>
                                    <span>Status: {order.status}</span>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Admin;
