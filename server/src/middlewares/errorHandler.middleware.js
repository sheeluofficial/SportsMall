const ErrorHandler = require("../utils/errorhandler");

const errorHandlerMid = (err,req,res,next)=>{

    err.message = err.message || "Internal server Error";
    err.statusCode = err.statusCode || 500;

    // Invalid mongodb Id error

    if(err.name==="CastError") {
        const message = `Resourse not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({err:err.message,
    success:false
    })

}

module.exports = errorHandlerMid