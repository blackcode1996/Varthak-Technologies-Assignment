const app=require("./app")
const connectDatabase = require("./config/database")

connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`App is listining to port number ${process.env.PORT}`)
})

