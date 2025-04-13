import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/login'); // Redirect to login
  };

  return (
    <header style={styles.header}>
      <nav>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <button onClick={handleLogout} style={styles.link}>Logout</button>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    padding: '1rem',
    backgroundColor: '#333',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Header;
