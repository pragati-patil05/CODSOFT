const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/create-order", async (req, res) => {
  try {
    const { user, cartItems, total } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const itemList = cartItems
      .map((item) => `${item.name} - ₹${item.price}`)
      .join("\n");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Order Confirmation - E-commerce Store",
      text: `Hello ${user.name},

Your order has been placed successfully!

Items:
${itemList}

Total: ₹${total}

Thank you for shopping with us!

- Pragati Store`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Order placed and email sent!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Email failed" });
  }
});

module.exports = router;

