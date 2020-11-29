import Joi from "@hapi/joi";

export const schemas = {
    validate: Joi.object().keys({
        isValidated: Joi.boolean().required()
    }),
    active: Joi.object().keys({
        isActive: Joi.boolean().required()
    }),
    delete: Joi.object().keys({
        isDeleted: Joi.boolean().required()
    }),
    administrator: Joi.object().keys({
        isAdmin: Joi.boolean().required()
    }),

};
