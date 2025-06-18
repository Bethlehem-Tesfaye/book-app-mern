import express from "express"
import { PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
const app = express();
import cors from 'cors'

// middleware for parasing request body(also for post)
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// middleware fo rhandling CORD ploicy
// option1: allow all orgins with default of cors(*)
app.use(cors())
// option2 allow custon origins
// app/use(
//     cors({
//         origin:'http://localhost:5555',
//         methods:['GET','POST','PUT', 'DELETE'],
//         allowedHeaders:['Content-Type']
//     })
// )

// routes
app.use('/books',booksRoute)
// console.log('h');

mongoose.connect(mongoDBURL).then(()=>{
    console.log('App connected to databases');
    app.listen(PORT, ()=>{
        console.log('server running on port',PORT);
    })
    
}).catch((error)=>{
    console.log(error);
    
})