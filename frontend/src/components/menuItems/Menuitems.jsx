import React from "react";
import { useCart } from "../../helpers/CartContext";

function Menuitems({ id, image, name, price }) {
  const { addToCart } = useCart();

  return (
    <div className="menuItem">
      <div className="menuImage" style={{ backgroundImage: `url(${image})` }}></div>
      <h1>{name}</h1>
      <p>₦{price}</p>
      <button className="add-to-cart-btn" onClick={() => addToCart({ id, image, name, price })}>
        Add to Cart
      </button>
    </div>
  );
}

export default Menuitems;

