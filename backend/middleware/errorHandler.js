function errorHandler(error, req, res, _next) {
    const invalidJson = error.type === "entity.parse.failed";
    const bodyTooLarge = error.type === "entity.too.large";
    const apiError = Number.isInteger(error.status) && typeof error.apiCode === "string";
    const status = invalidJson ? 400 : bodyTooLarge ? 413 : apiError ? error.status : 500;

    if (status >= 500) {
        console.error(`${req.method} ${req.originalUrl}`, error);
    }

    const response = {
        error: {
            code: invalidJson ? "INVALID_JSON" : bodyTooLarge ? "PAYLOAD_TOO_LARGE" : status === 500 ? "INTERNAL_SERVER_ERROR" : error.apiCode,
            message: invalidJson ? "Request body contains invalid JSON" : bodyTooLarge ? "Request body is too large" : status === 500 ? "Internal server error" : error.message,
        }
    };

    if (status < 500 && error.details !== undefined) {
        response.error.details = error.details;
    }

    res.status(status).json(response);
}

module.exports = errorHandler;
