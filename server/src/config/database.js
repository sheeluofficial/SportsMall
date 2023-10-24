const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:"./.env"});
mongoose.set('strictQuery', false);
const connectDatabase = ()=> mongoose.connect(
   process.env.DB_URI ,
    { useNewUrlParser: true, useUnifiedTopology: true }
   
    ).then((data)=>{
      console.log(`Mongodb connected with server: ${data.connection.host}`)
    })

    module.exports = connectDatabase;