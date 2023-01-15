const Joi = require('joi');

const schema = Joi.object().keys({
    // eslint-disable-next-line prettier/prettier
    username: Joi.string().alphanum().min(3).max(30)
.required(),
});

const userSchemaValidate = (data) => {
    const info = data;
    const result = schema.validate(info);
    info.createdAt = new Date();
    result.value = info;
    return result;
};

module.exports = userSchemaValidate;
