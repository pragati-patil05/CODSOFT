import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import PaymentMethod from "./pages/PaymentMethod";
import Bill from "./pages/Bill";
import "./App.css";

function App() {
  return (
    <>
    <div className="background">
    <div className="stars"></div>
  
  
  

 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment-method" element={<PaymentMethod />} />
<Route path="/bill" element={<Bill />} />

    </Routes>
    </div>
    
    </>
  );
}

export default App;