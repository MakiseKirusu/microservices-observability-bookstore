import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [checkoutStatus, setCheckoutStatus] = useState(null);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setCheckoutStatus('processing');

    try {
      const response = await fetch('/api/catalog/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cartItems.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity
          })),
          total: cartTotal, 
          payment_method: "credit_card"
        }), 
      });

      if (!response.ok) throw new Error("Checkout failed");

      setCheckoutStatus('success');
      clearCart(); 
    } catch (err) {
      console.error(err);
      setCheckoutStatus('error');
    }
  };

  // Render a success screen if the backend accepted the POST request
  if (checkoutStatus === 'success') {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem' }}>
        <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1rem' }} />
        <h2 style={{ marginBottom: '1rem', fontSize: '2rem', fontWeight: 'bold' }}>Order Successful!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your order has been securely processed by the catalog service.</p>
        <Link to="/" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="cart-container empty-cart">
          <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Looks like you haven't added any books yet.</p>
          <Link to="/" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title" style={{ marginTop: '2rem', marginBottom: '2rem' }}>Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.cover} alt={item.title} className="cart-item-image" />
              
              <div className="cart-item-info">
                <Link to={`/book/${item.id}`}>
                  <h3 className="cart-item-title">{item.title}</h3>
                </Link>
                <p className="cart-item-author">{item.author}</p>
                <div style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
                  ${item.price.toFixed(2)} each
                </div>
              </div>
              
              <div className="cart-item-actions">
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.25rem' }}>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ background: 'none', border: 'none', padding: '0.25rem', cursor: 'pointer', display: 'flex' }}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} color={item.quantity <= 1 ? '#cbd5e1' : 'var(--text-main)'} />
                  </button>
                  <span style={{ width: '30px', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500' }}>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ background: 'none', border: 'none', padding: '0.25rem', cursor: 'pointer', display: 'flex' }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="cart-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', color: '#ef4444', display: 'flex' }}
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="cart-summary-content">
            <div className="summary-row">
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>${cartTotal.toFixed(2)}</span>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
              onClick={handleCheckout}
              disabled={checkoutStatus === 'processing'}
            >
              {checkoutStatus === 'processing' ? 'Processing...' : 'Proceed to Checkout'}
              {checkoutStatus !== 'processing' && <ArrowRight size={20} />}
            </button>
            
            {checkoutStatus === 'error' && (
              <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
                Checkout failed. Make sure the catalog service is running.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;