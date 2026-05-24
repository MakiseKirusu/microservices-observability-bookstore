import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ShoppingBag, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartCount } = useCart();
  const location = useLocation();

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <BookOpen size={28} />
          <span>Lumina Books</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <div className="search-mockup" style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '0.4rem 0.8rem', borderRadius: '20px', color: '#64748b' }}>
            <Search size={16} style={{ marginRight: '0.5rem' }} />
            <span style={{ fontSize: '0.875rem' }}>Search books...</span>
          </div>
          <Link to="/cart" className={`nav-link cart-icon-wrapper ${location.pathname === '/cart' ? 'active' : ''}`}>
            <ShoppingBag size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
