const express = require('express');
const Stripe = require('stripe');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'inr',  
        product_data: {
          name: item.product.title,
          images: [item.product.image?.src || 'placeholder.jpg'],
        },
        unit_amount: item.product.variants[0]?.price * 100,  
      },
      quantity: 1,
    }));

    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,  
      cancel_url: `${process.env.CLIENT_URL}/cancel`,    
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Server Error");
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
