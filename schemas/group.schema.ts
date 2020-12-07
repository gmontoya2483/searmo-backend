import Joi from "@hapi/joi";

export const schemas = {
    new: Joi.object().keys({
        title: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(5).max(255).required(),
    }),
    update: Joi.object().keys({
        title: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(5).max(255).required(),
    }),
    delete: Joi.object().keys({
        isDeleted: Joi.boolean().required()
    }),
};
