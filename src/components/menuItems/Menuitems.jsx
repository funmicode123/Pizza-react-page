import React from "react";

function Menuitems({ image, name, price }) {
  return (
    <div className="menuItem">
      <div className="menuImage" style={{ backgroundImage: `url(${image})` }}></div>
      <h1>{name}</h1>
      <p>₦{price}</p>
    </div>
  );
}

export default Menuitems;
