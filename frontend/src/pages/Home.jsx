import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [books, setBooks] = useState([]);
  const { addToCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    // Check the URL for a search term
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    
    // Dynamically build the fetch URL
    const endpoint = searchQuery 
      ? `/api/catalog/books?search=${encodeURIComponent(searchQuery)}` 
      : '/api/catalog/books';

    fetch(endpoint)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, [location.search]); // Re-run whenever the URL changes
  
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Discover Your Next Great Read</h1>
        <p className="page-subtitle">Explore our curated collection of bestsellers, classics, and new releases.</p>
      </div>

      <div className="book-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <Link to={`/book/${book.id}`} className="book-image-container">
              <img src={book.cover} alt={book.title} className="book-image" loading="lazy" />
            </Link>
            <div className="book-info">
              <Link to={`/book/${book.id}`}>
                <h3 className="book-title">{book.title}</h3>
              </Link>
              <p className="book-author">{book.author}</p>
              <div className="book-price-row">
                <span className="book-price">${book.price.toFixed(2)}</span>
                <button 
                  className="btn btn-primary"
                  onClick={() => addToCart(book)}
                  aria-label={`Add ${book.title} to cart`}
                >
                  <ShoppingCart size={18} style={{ marginRight: '0.5rem' }} />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
