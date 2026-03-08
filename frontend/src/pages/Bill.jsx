import { useEffect, useState } from "react";
import axios from "axios";

function Bill() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    setCartItems(items);
    setUser(loggedUser);

    const sum = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);

    if (loggedUser && items.length > 0) {
      axios.post("http://localhost:5000/api/create-order", {
        user: loggedUser,
        cartItems: items,
        total: sum,
      });

      localStorage.removeItem("cart");
    }
  }, []);

  return (
    <div>
      <h2>Order Bill</h2>

      {user && <p>Customer: {user.name}</p>}
      {user && <p>Email: {user.email}</p>}

      {cartItems.map((item, index) => (
        <div key={index}>
          {item.name} - ₹{item.price}
        </div>
      ))}

      <h3>Total Amount: ₹{total}</h3>

      <h4>Order Confirmation Email Sent 📧</h4>
    </div>
  );
}

export default Bill;