
import React, { useState } from "react";
import "./App.css";
import tshirtsData from "./tshirts.json";

function App() {
  const [tshirts, setTshirts] = useState(tshirtsData);

  const handleBuy = (id, quantity) => {
    const updatedTshirts = tshirts.map((shirt) => {
      if (shirt.id === id) {
        return { ...shirt, stock: shirt.stock - quantity };
      }
      return shirt;
    });
    setTshirts(updatedTshirts);
  };

  return (
    <div className="app">
      <h1>A++ T-Shirts</h1>
      <div className="tshirt-list">
        {tshirts.map((shirt) => (
          <TShirtCard key={shirt.id} shirt={shirt} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  );
}

function TShirtCard({ shirt, onBuy }) {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleClick = () => {
    onBuy(shirt.id, quantity);
    setQuantity(1);
  };

  return (
    <div className="tshirt-card">
      <img src={shirt.image} alt={shirt.title} className="tshirt-image" />
      <h2>{shirt.title}</h2>
      <p>${shirt.price}</p>
      {shirt.stock === 0 ? (
        <p className="out-of-stock">Out of Stock</p>
      ) : (
        <>
          <p>In Stock: {shirt.stock}</p>
          <select value={quantity} onChange={handleChange}>
            {Array.from({ length: shirt.stock }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button onClick={handleClick}>Buy</button>
        </>
      )}
    </div>
  );
}

export default App;
