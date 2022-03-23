const Joi = require("joi");

const taskValidation = Joi.object({
    description: Joi.string().min(1).required()
})

const userValidation = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(5).required()
})

module.exports = { taskValidation, userValidation };