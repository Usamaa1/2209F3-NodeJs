import React, { useState } from 'react';
import axios from 'axios';

export default function DateFilteredPosts() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [posts, setPosts] = useState([]);

  const handleFilter = async () => {
    if (!start || !end) {
      alert('Please select both start and end dates');
      return;
    }

    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/post/dateFilter', {
        params: {
          start,
          end
        }
      });
      setPosts(data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch filtered posts');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Filter Posts by Date</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <button
        onClick={handleFilter}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Filter Posts
      </button>

      <div className="mt-6 space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="border p-4 rounded shadow bg-white">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Created At: {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
