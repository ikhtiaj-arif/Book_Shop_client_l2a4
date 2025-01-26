// src/pages/Checkout.js
import React from 'react';
import { useParams } from 'react-router-dom';

const Checkout = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Checkout Page</h2>
      <p>Proceeding to checkout for product ID: {id}</p>
      {/* Checkout logic goes here */}
    </div>
  );
};

export default Checkout;