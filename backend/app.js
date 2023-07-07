const express = require('express');
const userRoutes = require('./routes/userRoute');
const bookRoutes =require('./routes/bookRoute')

require('dotenv').config({path:"./config/config.env"});

const app = express();

app.use(express.json());


app.use('/user', userRoutes);

app.use('/books',bookRoutes)

app.get("/",(req,res)=>{
    let initialData=`Welcome to Varthak Technologies Assignment backend 🥳.`
    res.send(initialData)
})

module.exports = app;