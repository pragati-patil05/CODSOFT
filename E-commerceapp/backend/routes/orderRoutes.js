const express = require("express");
const router = express.Router();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/create-order", async (req, res) => {
  try {
    const { user, cartItems, total } = req.body;

    const itemList = cartItems
      .map((item) => `${item.name} - ₹${item.price}`)
      .join("\n");

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: user.email,
      subject: "Order Confirmation - Pragati Store",
      text: `Hello ${user.name},

Your order has been placed successfully!

Items:
${itemList}

Total: ₹${total}

Thank you for shopping with us!

- Pragati Store`
    });

    res.json({ message: "Order placed and email sent!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Email failed" });
  }
});

  


module.exports = router;



