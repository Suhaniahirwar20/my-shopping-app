import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext'; // 👈 import the cart context

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // 👈 get the addToCart function

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <img src={product.image} alt={product.title} style={styles.image} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <h3>${product.price}</h3>
      <button style={styles.button} onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

const styles = {
  container: {
    padding: '1rem',
    textAlign: 'center',
  },
  image: {
    height: '200px',
    objectFit: 'contain',
  },
  button: {
    marginTop: '1rem',
    padding: '0.7rem 1.2rem',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ProductDetail;
