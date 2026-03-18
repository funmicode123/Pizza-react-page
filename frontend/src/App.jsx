import "./App.css"
import { CartProvider } from "./helpers/CartContext"

import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer"
import Home from "./pages/home";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";



import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "./helpers/supabaseClient";

function App() {

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Attempt to sync the user to the backend
        // This is safe even if the user already exists because the backend handles it gracefully
        try {
          const user = session.user;
          const fullName = user.user_metadata?.full_name || '';
          const nameParts = fullName.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

          await fetch('http://localhost:8081/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
              email: user.email,
              firstName: firstName,
              lastName: lastName
            })
          });
          console.log("OAuth user synced to backend successfully.");
        } catch (err) {
          console.error("Backend sync failed during OAuth login:", err);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <CartProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/menu" exact element={<Menu />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/admin" exact element={<Admin />} />



          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </div>

  )
}

export default App;