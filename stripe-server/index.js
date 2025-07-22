// stripe-server/index.js

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.pk_test_51Rn3bu4ehO5EuF7qlP5wP4FXXpKQUUZPMysfe5PT3RqAFumiYKiE99l3iVsIlAog2VvNNQdA0e6fdi47rPRNBLoI00bBMpJGux); // Mets ta clé secrète Stripe ici ou dans un .env

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customerEmail } = req.body;

    // Transforme tes items du panier au format Stripe
    const line_items = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.title,
          images: item.images ? [item.images[0]] : [],
        },
        unit_amount: Math.round(Number(item.price) * 100), // prix en centimes
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:5173/success', // Change pour ta prod
      cancel_url: 'http://localhost:5173/panier',
      customer_email: customerEmail, // facultatif
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log('Stripe server running on port 4242'));
