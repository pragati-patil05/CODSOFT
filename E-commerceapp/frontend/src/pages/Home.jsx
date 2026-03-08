import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  // Load logged-in user
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  // Fetch products from backend
  useEffect(() => {
    axios
      .get("https://e-commerce-backend-0j0w.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <nav className="navbar">
          <div className="logo"></div>

          <div className="nav-right">
            <input
              type="text"
              placeholder="Search products..."
              className="search-bar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {user ? (
              <>
                <span className="nav-btn">Hi, {user.name} 👋</span>
                <Link to="/cart" className="nav-btn">
                  Cart 🛒
                </Link>
                <button className="nav-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-btn">
                  Login
                </Link>
                <Link to="/register" className="nav-btn">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="hero-content">
          <h1>Welcome to E-commerce Store</h1>
          <p>Created by Pragati Patil</p>
          <a href="#products" className="shop-btn">
            Shop Now ↓
          </a>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products" id="products">
        <h2>Our Products</h2>

        <div className="product-grid">
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => (
              <div className="product-card" key={product._id}>
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}


export default Home;
