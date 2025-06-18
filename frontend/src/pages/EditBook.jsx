import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Snipper from '../components/snipper';

const EditBook = () => {
  const [editBook, setEditBook] = useState({title:"",author:"", publishYear:""});
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:5555/books/${id}`).then((res)=>{
      setEditBook(res.data)
    }).catch((error)=>{
      console.log(error);
    })

  }, [id])
  const handleEdit = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:5555/books/edit/${id}`, editBook)
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
      
    }
  }
  const handleInput =(e)=>{
    setEditBook((prev)=>({
      ...prev,[e.target.name]:e.target.value 
    }))
  }
  return (
<div className='flex justify-center items-center'>
        {loading?(
      <Snipper/>
    ):(
      <form onSubmit={handleEdit}>
        <div>
          <label>Title: <input type="text" name="title" placeholder='title' value={editBook.title}  onChange={handleInput}/></label>
        </div>
          
        <div>
          <label>Author: <input type="text"  name='author' value={editBook.author} placeholder='author' onChange={handleInput}/></label>
        </div>

        <div>
          <label>PublishYear: <input type="text" name='publishYear' value={editBook.publishYear}   placeholder='publish year' onChange={handleInput}/></label>
        </div>

        <button type='submit'>EDIT BOOK</button>
      </form>
    )}
    </div>
    
    
  )
}

export default EditBook