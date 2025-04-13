// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('Login Response:', data);  // Log the API response

    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/');  // Redirect to ProductList page
    } else {
      setError('Invalid credentials. Try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>

      {/* Link to Create Account Page */}
      <div style={styles.accountLink}>
        <p>Don't have an account? <a href="/create-account" style={styles.link}>Create Account</a></p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#2a2a2a',  // Background color of the page
    color: 'white',               // Text color
    minHeight: '100vh',
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',  // Ensure vertical stacking
    maxWidth: '300px',
    margin: '0 auto',
    gap: '1.5rem',            // Increased gap between elements for better spacing
    backgroundColor: '#3b3b3b',  // Background color of the form
    padding: '2rem',
    borderRadius: '8px',         // Rounded corners
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    backgroundColor: '#4a4a4a',  // Input background color
    color: 'white',              // Input text color
    border: '1px solid #555',    // Input border color
    borderRadius: '5px',
  },
  button: {
    padding: '0.7rem',
    fontSize: '1rem',
    backgroundColor: '#646cff',   // Button background color
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',          // Rounded corners for button
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#535bf2',   // Button hover color
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
  },
  link: {
    color: '#646cff',   // Link color
    textDecoration: 'none',
  },
  linkHover: {
    color: '#535bf2',   // Link hover color
  },
  accountLink: {
    marginTop: '1rem',  // Space between form and the "Create Account" link
    color: 'white',
  },
};

export default Login;
