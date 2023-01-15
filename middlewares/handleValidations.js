const { BadRequest } = require('../utils/errors');

const handleValidation = (validate) => (req, res, next) => {
    const result = validate(req.body);
    const isValid = result.error == null;
    if (isValid) {
        return next();
    }

    const { details } = result.error;
    const messages = details.map((err) => err.message);
    const msg = messages.join(',');
    throw new BadRequest(msg);
};

module.exports = handleValidation;
