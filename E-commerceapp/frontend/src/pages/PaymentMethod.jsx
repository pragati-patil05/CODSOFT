import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

function PaymentMethod() {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const randomUPI = `upi://pay?pa=random${Math.floor(Math.random()*10000)}@upi&pn=PragatiStore`;

  return (
    <div>
      <h2>Select Payment Method</h2>

      <button onClick={() => navigate("/bill")}>
        Cash on Delivery
      </button>

      <button onClick={() => setShowQR(true)}>
        Pay via UPI
      </button>

      {showQR && (
        <div>
          <h3>Scan & Pay</h3>
         <QRCodeCanvas value={randomUPI} size={200} />
          <br /><br />
          <button onClick={() => navigate("/bill")}>
            Payment Done
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentMethod;