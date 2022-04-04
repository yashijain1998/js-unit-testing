const Joi = require("joi");

const taskValidation = Joi.object({
    description: Joi.string().min(1).required()
})

const signUpValidation = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    name: Joi.string().min(3).required(),
    password: Joi.string().min(5).required()
})

const signInValidation = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(5).required()
})

const isSignUpValid = (data) => {
    const validateResult = signUpValidation.validate(data);
    if(validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

const isSignInValid = (data) => {
    const validateResult = signInValidation.validate(data);
    if(validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

const isTaskValid = (data) => {
    const validateResult = taskValidation.validate(data);
    if(validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = { isSignUpValid, isSignInValid, isTaskValid };