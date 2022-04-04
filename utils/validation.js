const Joi = require("joi");

const taskValidation = Joi.object({
    description: Joi.string().min(1).required()
})

const userValidation = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(5).required()
})

const isValidUser = (data) => {
    const validateResult = userValidation.validate(data);
    if(validateResult.error) {
        throw new Error(validateResult.error.message);
    }
    return 
}

const isValidTask = (data) => {
    const validateResult = taskValidation.validate(data);
    if(validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = { isValidTask, isValidUser };