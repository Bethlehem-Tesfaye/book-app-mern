import express from 'express'
import { Book } from '../models/bookModel.js';

const router = express.Router();


// router for save a new Book
router.post('/', async (req, res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).json({
                message:'send all required fields:title, authore, publishYear'
            })
        };
        const newBook ={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        }

        const book = await Book.create(newBook);
        return res.status(201).json({
            data:book
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
        
    }
})

// router to Get all books
router.get('/',async (req,res)=>{
    try {
        const books = await Book.find();
        return res.status(200).json({
            count:books.length,
            data:books,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message
        })
        
    }
})

// router to Get one books by id
router.get('/:id',async (req,res)=>{
    try {
        // const books = await Book.find();
        const {id} = req.params;
        // const book = books.find((b)=>b.id==id);//this is a long way of doing it and there is a built in function to handle search by id so use that instead
        
        const book = await Book.findById(id)
        if(!book){
            return res.status(404).json({
                message:`error: no book by the id ${id}`
            })
        }
        return res.status(200).json(book);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message
        })
        
    }
})


// router to update a book by id
router.put('/edit/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        if(!req.body.title || !req.body.author  ||!req.body.publishYear){
            return res.status(400).json({
                message:'send all required fields:title, authore, publishYear'
            })
        }
        const updateData = await Book.findByIdAndUpdate(id, req.body,{new:true})//here if we dont add the new:true it wont return the updated version 
        if(!updateData){
            return res.status(404).json({
                message:`error: no book by the id ${id}`
            })
        }
        return res.status(200).json({
            msg:"book updtaed successfully",
            data:updateData})

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message
        })
        
    }
})


// router for deleting a book by id
router.delete('/delete/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteBook = await Book.findByIdAndDelete(id)
        if(!deleteBook){
            return res.status(404).json({
                message:`book with the id:${id} was not found`,
            })
        }
        return res.status(200).json({
            msg:"book deleted successfully",

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message
        })
        
    }
})

export default router