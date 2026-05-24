import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { mockBooks } from '../data/mockBooks';
import { useCart } from '../context/CartContext';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const book = mockBooks.find(b => b.id === id);

  if (!book) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>Book not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book, quantity);
    navigate('/cart');
  };

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className="container">
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem', color: 'var(--text-muted)' }}>
        <ArrowLeft size={20} />
        Back to Books
      </Link>
      
      <div className="book-detail-container">
        <div className="detail-image-wrapper">
          <img src={book.cover} alt={book.title} className="detail-image" />
        </div>
        
        <div className="detail-info">
          <h1 className="detail-title">{book.title}</h1>
          <p className="detail-author">by {book.author}</p>
          <div className="detail-price">${book.price.toFixed(2)}</div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Description</h3>
            <p className="detail-desc">{book.description}</p>
          </div>
          
          <div className="detail-actions">
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.25rem' }}>
              <button 
                onClick={decrement} 
                style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', display: 'flex' }}
                disabled={quantity <= 1}
              >
                <Minus size={18} color={quantity <= 1 ? '#cbd5e1' : 'var(--text-main)'} />
              </button>
              <span style={{ width: '40px', textAlign: 'center', fontWeight: '500' }}>{quantity}</span>
              <button 
                onClick={increment}
                style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', display: 'flex' }}
              >
                <Plus size={18} />
              </button>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ padding: '0.75rem 2rem', fontSize: '1rem', flex: 1 }}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={20} style={{ marginRight: '0.5rem' }} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
