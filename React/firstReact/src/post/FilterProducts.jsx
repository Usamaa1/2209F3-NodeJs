import React, { useState } from 'react';
import axios from 'axios';

export default function FilterProducts() {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);

  const handleFilter = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/products/filter', {
        params: {
          category,
          minPrice,
          maxPrice
        }
      });
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch products');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Filter Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input 
          type="text" 
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        />
        <input 
          type="number" 
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <input 
          type="number" 
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <button 
        onClick={handleFilter}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Filter
      </button>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-gray-800 font-bold">Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
