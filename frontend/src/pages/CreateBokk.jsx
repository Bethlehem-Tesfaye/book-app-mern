import React, { useState } from "react";
import axios from "axios";
import Snipper from "../components/snipper";

const CreateBokk = () => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5555/books", newBook);
      setLoading(false);
      setMessage("Book successfully created!");
      setNewBook({ title: "", author: "", publishYear: "" });
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading ? (
        <Snipper />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {message && (
            <div className="text-green-600 font-semibold text-center mb-4">
              {message}
            </div>
          )}
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Add New Book
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={newBook.title}
                placeholder="Book title"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Author:
              </label>
              <input
                type="text"
                name="author"
                value={newBook.author}
                placeholder="Book author"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Publish Year:
              </label>
              <input
                type="text"
                name="publishYear"
                value={newBook.publishYear}
                placeholder="Publish year"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Book
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateBokk;
