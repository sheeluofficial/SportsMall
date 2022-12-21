const express = require("express")
const errorHandlerMid = require("./src/middlewares/errorHandler.middleware.js")
const app = express()

app.use(express.json())

// route imports 
const  product = require("./src/routes/product.route.js")

app.use("/api/v1",product)

app.use(errorHandlerMid)

module.exports = app