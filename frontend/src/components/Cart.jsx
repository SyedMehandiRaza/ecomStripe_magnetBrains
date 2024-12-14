import { useSelector } from 'react-redux';
import CheckoutForm from './CheckoutForm';

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);

  return (
    <div className="container mt-5">
      <h1>Shopping Cart</h1>
      <div className="row">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((product) => (
            <div className="col-md-4 col-6 mb-3" key={product.id}>
              <div className="card p-3">
                <img
                  src={product.product.image?.src || 'placeholder.jpg'}
                  alt={product.product.title}
                  className="card-img-top mb-3"
                />
                <h5>{product.product.title}</h5>
                <p>Price: Rs. {product.product.variants[0]?.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && <CheckoutForm />}
    </div>
  );
};

export default Cart;
