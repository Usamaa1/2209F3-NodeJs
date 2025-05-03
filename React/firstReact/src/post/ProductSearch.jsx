import React, { useState } from 'react';
import axios from 'axios';

export default function ProductSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchProducts = async () => {
    if (!query.trim()) {
      alert('Please enter a search term');
      return;
    }

    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/products/search', {
        params: { q: query }
      });
      setResults(data);
    } catch (err) {
      console.error(err);
      alert('Search failed. Try again.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Products</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => { 
            setQuery(e.target.value); 
            console.log(e.target.value) 
          }}
          placeholder="Search by name or description..."
          className="flex-1 border px-4 py-2 rounded"
        />
        <button
          onClick={searchProducts}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {results.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="space-y-4">
          {results.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow bg-white">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-500 mt-2">Price: ${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
