import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, ShoppingBag, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/');
    }
  };

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
          
          {/* THE NEW WORKING SEARCH FORM */}
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '0.4rem 0.8rem', borderRadius: '20px' }}>
            <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}>
              <Search size={16} color="#64748b" style={{ marginRight: '0.5rem' }} />
            </button>
            <input 
              type="text" 
              placeholder="Search books..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.875rem', width: '150px', color: '#0f172a' }}
            />
          </form>
          
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