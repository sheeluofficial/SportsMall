const express = require("express");
const errorHandlerMid = require("./src/middlewares/errorHandlerMiddleware.js");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload"); // used for image and other files
const path = require("path");
const cors = require("cors");

const app = express();




app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(cors());

// route imports 
const  product = require("./src/routes/productRoutes.js");
const user = require("./src/routes/userRoutes.js");
const order = require("./src/routes/orderRoutes.js");
const payment = require("./src/routes/paymentRoutes.js");
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server is running",
        success :true
    })
})
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);


// Middleware for error handling


const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "/client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
);

app.use(errorHandlerMid)

module.exports = app;