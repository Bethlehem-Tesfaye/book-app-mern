import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Snipper from '../components/snipper';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const EditBook = () => {
  const [editBook, setEditBook] = useState({ title: "", author: "", publishYear: "" });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${backendURL}/books/${id}`)
      .then((res) => {
        setEditBook(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${backendURL}/books/edit/${id}`, editBook);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleInput = (e) => {
    setEditBook((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }));
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading ? (
        <Snipper />
      ) : (
        <form 
          onSubmit={handleEdit} 
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700">Edit Book</h2>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Title:
              <input 
                type="text" 
                name="title" 
                placeholder="Title" 
                value={editBook.title} 
                onChange={handleInput}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Author:
              <input 
                type="text" 
                name="author" 
                placeholder="Author" 
                value={editBook.author} 
                onChange={handleInput}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Publish Year:
              <input 
                type="text" 
                name="publishYear" 
                placeholder="Publish Year" 
                value={editBook.publishYear} 
                onChange={handleInput}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Edit Book
          </button>
        </form>
      )}
    </div>
  );
}

export default EditBook;
