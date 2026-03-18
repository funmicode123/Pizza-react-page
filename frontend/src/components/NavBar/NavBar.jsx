import { useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../helpers/CartContext'
import "../NavBar/NavBar.css";
import Logo from "../../assets/pizzaLogo.png"

const NavBar = () => {
  const { cart } = useCart();
  const [openLink, setOpenLink] = useState(false);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const toggleNavBar = () => {
    setOpenLink(!openLink);
  };

  return (
    <div className="navBar">
      <div className="left-navbar" id={openLink ? "open" : "close"}>
        <img src={Logo} alt="Logo" />
      </div>

      <div className="right-navbar">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart" className="cart-link">
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </Link>
        <div className="accessButton">
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}


export default NavBar
