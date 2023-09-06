import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";
import path from 'path'
// const stripe = require("stripe")(import.meta.env.STRIPE_PRIVATE_KEY);
dotenv.config();

const stripekey = process.env.VITE_STRIPE_PRIVATE_KEY;
const stripe = new Stripe(stripekey);

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"))
  })
}

app.get("/", (req, res) => {
  res.send("welcome to Xmarket");
  console.log(stripekey);
});

const array = [];
const calculateOrderAmount = (items) => {

     items.map((item) => {
       const { price, cartQuantity } = item;
       const cartItemAmount = price * cartQuantity;
       return array.push(cartItemAmount);
     });
     const totalAmount = array.reduce((a, b) => {
       return a + b;
     }, 0);
    
  return totalAmount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, shipping, description } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",

    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
    //receipt_email: customerEmail
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
