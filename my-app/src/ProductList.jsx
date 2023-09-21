// ProductList.js

import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          {/* Add more product details as needed */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
