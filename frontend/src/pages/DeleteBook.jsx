import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Snipper from '../components/snipper';

const DeleteBook = () => {
  const [deleteBook, setDeleteBook] = useState({
    title:"",author:"", publishYear:""
  });
  const [loading, setLoading] = useState(false);
  const [bookDeleted , setBookDeleted] = useState(false)
  const {id } =useParams();
  console.log(id);
  

  useEffect(()=>{
    axios.get(`http://localhost:5555/books/${id}`).then((res)=>{
        setDeleteBook(res.data);
    }).catch((error)=>{
      console.log(error);
      
    })
  },[])
  const handleDelete =()=>{
    setLoading(true);
    try {
      axios.delete(`http://localhost:5555/books/delete/${id}`).then(()=>{
        console.log('book deleted successfully');
        setLoading(false)
        setBookDeleted(true);
        
      }).catch((error)=>{
        console.log(error);
        setLoading(false)
        
      })
    } catch (error) {
      console.log(error);
      setLoading(false);
      
    }
   
  }
  return (
    <div className='p-20
    '>
      {loading?(     
        <Snipper/>):
      (
        bookDeleted?(
          <div className='p-20'><p className='text-2xl'>Book deleted successfully!</p></div>
        ):(
        <div className='flex flex-col gap-4'>
          <div>
            <span className='font-bold'>Title: </span>
            <span>{deleteBook.title}</span>
         </div>
         <div>
            <span className='font-bold'>Author: </span>
            <span>{deleteBook.author}</span>
        </div>
      <button className='w-30 border border-black rounded-md' onClick={handleDelete}>Delete Book</button>
      </div>
        )
      )}
      
    </div>
  )
}

export default DeleteBook