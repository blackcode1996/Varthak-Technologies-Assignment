 //connection with database

 const mongoose = require("mongoose");

 const connectDatabase=()=>{
   mongoose
     .connect(process.env.MONGO_URL)
     .then((res) => console.log(`Database Connected: ${res.connection.host}`))
     .catch((err) => console.log(err));
 }
 
 module.exports=connectDatabase

 