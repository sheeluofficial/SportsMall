const app = require("./app.js")
const dotenv = require("dotenv")
const connectDatabase = require("./src/config/database.js")
// Config 

// uncaught Exceptions

process.on("uncaughtException",(err)=>{
    console.log(`Error ${err.message}`)
    console.log("Shutting down the server due to uncaught Exceptions")
    process.exit(1)
    // server.close(()=>{
    //     process.exit(1)
    // })
    
})

dotenv.config({path:"./src/config/config.env"})

  // Database connection 
    
  connectDatabase()

// Running server

 const server = app.listen(process.env.PORT, ()=>{

        console.log("server is running on",process.env.PORT)  
})

// Unhandled Promise Rejections

process.on("unhandledRejection",(err)=>{
    console.log(`Error ${err.message}`)
    console.log("Shutting down the server due to unhandled Promise Rejection")
    server.close(()=>{
        process.exit(1)
    })
    
})
