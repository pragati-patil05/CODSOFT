import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => removeItem(index)}>Remove</button>
            <button onClick={() => navigate("/payment-method")}>
  Proceed to Payment
</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;