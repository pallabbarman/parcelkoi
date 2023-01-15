/* eslint-disable no-unused-vars */
const { GeneralError } = require('../utils/errors');

const handleErrors = async (err, req, res, next) => {
    if (err instanceof GeneralError) {
        const code = await err.getCode();
        res.status(code).json({ name: err.name, message: err.message });
    }

    // internal server error
    return res.status(500).json({ name: 'Internal Server Error', message: err.message });
};

module.exports = handleErrors;
