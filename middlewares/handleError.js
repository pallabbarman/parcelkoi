/* eslint-disable no-unused-vars */
const { GeneralError } = require('../utils/errors');

const handleErrors = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        const code = err.getCode();
        return res.status(code).json({
            name: err.name,
            message: err.message,
        });
    }

    return req.status(500).json({
        name: 'Internal Server Error',
        message: err.message,
    });
};

module.exports = handleErrors;
