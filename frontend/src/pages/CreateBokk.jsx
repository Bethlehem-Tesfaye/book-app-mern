import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Snipper from "../components/snipper";

const CreateBokk = () => {
  const [newBook, setNewBook] =useState({
    title:"",
    author:"",
    publishYear:"",
  });
    const [loading, setLoading] = useState(false);
    const [message, setmessage] = useState("")

    const handleSubmit = async (e)=>{
      e.preventDefault();
      setLoading(true);

      try{
        await axios.post('http://localhost:5555/books', newBook)
        setLoading(false);
        setmessage("book successfully created!")
        setNewBook({title:"", author:"", publishYear:""})
        setTimeout(()=>setmessage(""), 1000)
      }catch(error){
        console.log(error);
        setLoading(false)
      }
    }

    const handleChange =(e)=>{
      setNewBook((prev)=>({...prev, [e.target.name]: e.target.value}))
      setLoading(false)
    }
  return (
    <div className="p-4 min-h-screen">
      {loading?(<Snipper/>):(
        <div className="flex  flex-col items-center justify-center">
          {message && (<div className="text-green-600 font-bold mb-4">{message}</div>)}
        <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-5 ">

          <div className="flex"><label>Title: <input type="text" name="title" value={newBook.title} placeholder="book title" onChange={handleChange} className="border border-gray-500 rounded-xl px-4 py-1"/></label></div>

          <div className="flex">
          <label>Author: <input type="text" name="author" value={newBook.author} placeholder="book author" onChange={handleChange} className="border border-gray-500 rounded-xl px-4 py-1"/></label>
          </div>

          <div className="flex">
          <label>Publish year: <input type="text" name="publishYear" value={newBook.publishYear} placeholder="book publish year" onChange={handleChange} className="border border-gray-500 rounded-xl px-4 py-1"/></label>
          </div>      
          
          <button type="submit"  className="border border-black w-30 p-2 rounded-xl self-center mt-5">ADD BOOK</button>
        </form>
        </div>
      )}
    </div>
  )
}

export default CreateBokk;