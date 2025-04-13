// src/pages/ProductList.jsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch categories on mount
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Fetch products when selectedCategory changes
  useEffect(() => {
    const url =
      selectedCategory === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${selectedCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [selectedCategory]);

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2>🛒 Product List</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.search}
      />

      {/* Category dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={styles.select}
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Product cards */}
      <div style={styles.grid}>
        {filteredProducts.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            style={styles.card}
          >
            <img src={product.image} alt={product.title} style={styles.image} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '0rem',
    color:'white',
    fontSize: '1.5rem',
  },
  search: {
    padding: '0.5rem',
    marginBottom: '1rem',
    width: '100%',
    maxWidth: '300px',
  },
  select: {
    padding: '0.5rem',
    marginBottom: '1rem',
    marginLeft: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
  },
  card: {
    textDecoration: 'none',
    color: 'black',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: {
    height: '120px',
    objectFit: 'contain',
    marginBottom: '0.5rem',
  },
};

export default ProductList;
