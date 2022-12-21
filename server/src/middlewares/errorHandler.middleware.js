
const errorHandlerMid = (err,req,res,next)=>{

    err.message = err.message || "Internal server Error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({err:err.message,
    success:false
    })

}

module.exports = errorHandlerMid