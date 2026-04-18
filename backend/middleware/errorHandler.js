function errorHandler(error, req, res, next) {
    console.error(req.method, req.path,error.name + error.stack);
    res.status(error.status || 500).json({
        success: false,
        message: "Unfortunate internal server error"
    })
}

module.exports = errorHandler;