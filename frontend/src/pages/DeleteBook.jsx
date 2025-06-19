import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Snipper from '../components/Snipper';


const backendURL = import.meta.env.VITE_BACKEND_URL;

const DeleteBook = () => {
  const [deleteBook, setDeleteBook] = useState({ title: "", author: "", publishYear: "" });
  const [loading, setLoading] = useState(false);
  const [bookDeleted, setBookDeleted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${backendURL}/books/${id}`)
      .then((res) => {
        setDeleteBook(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleDelete = () => {
    setLoading(true);
    axios.delete(`${backendURL}/books/delete/${id}`)
      .then(() => {
        console.log('Book deleted successfully');
        setLoading(false);
        setBookDeleted(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading ? (
        <Snipper />
      ) : bookDeleted ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-2xl font-semibold text-green-600">Book deleted successfully!</p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-700">Delete Book</h2>
          <div>
            <span className="font-semibold text-gray-600">Title:</span>
            <span className="ml-2 text-gray-800">{deleteBook.title}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Author:</span>
            <span className="ml-2 text-gray-800">{deleteBook.author}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Publish Year:</span>
            <span className="ml-2 text-gray-800">{deleteBook.publishYear}</span>
          </div>
          <button 
            onClick={handleDelete} 
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
          >
            Delete Book
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
