const app = require("./app.js")
const dotevt = require("dotenv")
const connectDatabase = require("./src/config/database.js")
// Config 

dotevt.config({path:"./src/config/config.env"})

// Running server

app.listen(process.env.PORT,async ()=>{

    // Database connection 

    try{
        await connectDatabase()
        console.log("server is running on",process.env.PORT)
    }
    catch{
        console.log("Error connecting database")
    }
    
})