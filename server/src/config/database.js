const mongoose = require("mongoose")

const connectDatabase = ()=> mongoose.connect(
   process.env.DB_URI ,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
    )

    module.exports = connectDatabase