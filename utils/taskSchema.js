const Joi = require("joi");

const taskSchema = Joi.object({
    description: Joi.string().min(1).required()
})

module.exports = taskSchema;