import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
      <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
      <Link to="/register" style={{ marginRight: "15px" }}>Register</Link>
      <Link to="/cart" style={{ marginRight: "15px" }}>Cart</Link>
      <Link to="/checkout">Checkout</Link>
    </nav>
  );
}

export default Navbar;
