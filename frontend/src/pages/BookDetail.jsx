import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // New state to hold the data from the 3 microservices
  const [bookData, setBookData] = useState({ details: null, rating: null, reviews: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const [detailsRes, ratingRes, reviewsRes] = await Promise.all([
          fetch(`/api/catalog/books/${id}`),
          fetch(`/api/ratings/books/${id}/rating`),
          fetch(`/api/reviews/books/${id}/reviews`)
        ]);

        if (!detailsRes.ok) throw new Error("Catalog service unavailable.");

        const details = await detailsRes.json();
        const rating = ratingRes.ok ? await ratingRes.json() : { rating: "N/A" }; 
        const reviews = reviewsRes.ok ? await reviewsRes.json() : [];

        setBookData({ details, rating, reviews });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(bookData.details, quantity);
    navigate('/cart');
  };

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}><h2 style={{ color: 'var(--text-muted)' }}>Aggregating microservice data...</h2></div>;
  if (error) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem', color: '#ef4444' }}><h2>Error: {error}</h2></div>;
  if (!bookData.details) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}><h2>Book not found</h2></div>;

  const book = bookData.details;

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
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div className="detail-price" style={{ marginBottom: 0 }}>${book.price.toFixed(2)}</div>
            <div style={{ background: '#e0e7ff', color: '#4338ca', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.875rem' }}>
              ★ {bookData.rating.rating || bookData.rating.score || 'N/A'} / 5
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Description</h3>
            <p className="detail-desc">{book.description}</p>
          </div>
          
          <div className="detail-actions" style={{ marginBottom: '2rem' }}>
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

          {/* New Dynamic Reviews Section */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Customer Reviews</h3>
            {bookData.reviews.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {bookData.reviews.map(review => (
                  <div key={review.review_id} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{review.reviewer}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{review.date}</span>
                    </div>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.875rem' }}>{review.text}</p>
                    
                    {/* The Sentiment Tag - This will appear when Istio routes to v2! */}
                    {review.sentiment && (
                      <div style={{ 
                        display: 'inline-block', 
                        marginTop: '0.5rem', 
                        fontSize: '0.75rem', 
                        fontWeight: 'bold', 
                        padding: '0.1rem 0.5rem', 
                        borderRadius: '0.25rem',
                        backgroundColor: review.sentiment === 'positive' ? '#dcfce7' : review.sentiment === 'negative' ? '#fee2e2' : '#f1f5f9',
                        color: review.sentiment === 'positive' ? '#166534' : review.sentiment === 'negative' ? '#991b1b' : '#475569'
                      }}>
                        {review.sentiment.toUpperCase()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;