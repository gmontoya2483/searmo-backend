const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)


export const schemas = {
    new: Joi.object().keys({
        userId: Joi.objectId().required()
    }),
    delete: Joi.object().keys({
        isDeleted: Joi.boolean().required()
    }),
};
