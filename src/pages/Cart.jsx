import { useCart } from '../context/CartContext';
import { useState } from 'react';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000); // popup disappears after 4 sec
  };

  return (
    <div style={styles.container}>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.item}>
              <img src={item.image} alt={item.title} style={styles.image} />
              <div style={styles.details}>
                <h4>{item.title}</h4>
                <p>${item.price}</p>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  style={styles.input}
                />
                <button onClick={() => removeFromCart(item.id)} style={styles.remove}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3>Total: ${total}</h3>
          <button onClick={handleCheckout} style={styles.checkout}>
            Checkout
          </button>
        </>
      )}

      {showPopup && <div style={styles.popup}>🎉 Order placed successfully!</div>}
    </div>
  );
}

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '600px',
    margin: 'auto',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    padding: '1rem 0',
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
    marginRight: '1rem',
  },
  details: {
    flex: 1,
  },
  input: {
    width: '50px',
    marginRight: '1rem',
  },
  remove: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '0.4rem 0.8rem',
    cursor: 'pointer',
  },
  checkout: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  popup: {
    marginTop: '1rem',
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    textAlign: 'center',
    animation: 'fadeOut 4s ease forwards',
  },
};

export default Cart;
