import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Cart from './components/Cart.jsx';
import Success from './pages/Success.jsx';
import Cancel from './pages/Cancel.jsx';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Product Listing</Link>
            <Link className="btn btn-primary" to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
