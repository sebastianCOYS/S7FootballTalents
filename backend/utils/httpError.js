function createHttpError(status, apiCode, message, details) {
    const error = new Error(message);
    error.status = status;
    error.apiCode = apiCode;

    if (details !== undefined) {
        error.details = details;
    }

    return error;
}

module.exports = { createHttpError };
