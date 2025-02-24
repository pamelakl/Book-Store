import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '3rem', color: '#ff6f61' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.2rem' }}>Sorry, the page you're looking for doesn't exist.</p>
      <Link
        to="/"
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
        }}
      >
        Go Back to Homepage
      </Link>
    </div>
  );
}

export default NotFound;