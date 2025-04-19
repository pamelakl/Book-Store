import React from 'react';
import { Link } from 'react-router-dom';
import '../style/notFound.css'

function NotFound() {
  return (
    <div className='not-found-page'>
      <h1 className='not-found'>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.2rem' }}>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className='home-page-button'>Go Back to Homepage</Link>
    </div>
  );
}

export default NotFound;