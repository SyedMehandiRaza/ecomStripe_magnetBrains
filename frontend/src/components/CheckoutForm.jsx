import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce((total, product) => total + product.product.variants[0]?.price, 0);

  const handleCheckout = async () => {
    setLoading(true);

    const response = await fetch('http://localhost:5000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart }),
    });

    const session = await response.json();

    const stripe = await stripePromise;

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error('Stripe Checkout Error:', error);
    }

    dispatch(clearCart());
  };

  return (
    <div className="container mt-4">
      <h1>Checkout</h1>
      <p>Total: Rs. {totalAmount}</p>

      <button
        onClick={handleCheckout}
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </div>
  );
};

export default CheckoutForm;
