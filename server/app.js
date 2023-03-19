const express = require("express")
const errorHandlerMid = require("./src/middlewares/errorHandler.middleware.js")
const validator = require("validator")
const cookieParser = require("cookie-parser")
const app = express()

app.use(express.json())
app.use(cookieParser())
// route imports 
const  product = require("./src/routes/product.routes.js")
const user = require("./src/routes/user.routes")

app.use("/api/v1",product)
app.use("/api/v1",user)
// Middleware for error handling

app.use(errorHandlerMid)

module.exports = app