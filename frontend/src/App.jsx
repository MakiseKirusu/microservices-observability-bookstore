import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      
      <footer style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
        <p>&copy; {new Date().getFullYear()} Lumina Books. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
