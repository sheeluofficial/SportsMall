const app = require("./app.js");
const dotenv = require("dotenv");
const connectDatabase = require("./src/config/database.js");
const cloudinary = require("cloudinary");
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

dotenv.config();

  // Database connection 
  connectDatabase();

 // conncet with cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


// Running server
const server = app.listen(process.env.PORT, () => {
    const serverUrl = `http://localhost:${process.env.PORT}`;
    console.log("Server is running on", serverUrl);
  });
  

// Unhandled Promise Rejections

process.on("unhandledRejection",(err)=>{
    console.log(`Error ${err.message}`)
    console.log("Shutting down the server due to unhandled Promise Rejection")
    server.close(()=>{
        process.exit(1)
    })
    
})
