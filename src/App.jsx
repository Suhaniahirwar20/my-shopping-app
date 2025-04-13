import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Header from './components/Header';

function App() {
  const token = localStorage.getItem('token'); // Check login token

  return (
    <BrowserRouter>
      {token && <Header />}
      <Routes>
        {/* Redirect to login if no token */}
        <Route path="/" element={token ? <ProductList /> : <Navigate to="/login" />} />
        
        {/* Redirect logged-in users to Home if they try to access the login page */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />

        <Route path="/products/:id" element={token ? <ProductDetail /> : <Navigate to="/login" />} />
        <Route path="/cart" element={token ? <Cart /> : <Navigate to="/login" />} />
        
        {/* Catch any unknown path and redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
