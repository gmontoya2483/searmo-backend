const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

export const schemas = {
    new: Joi.object().keys({
        title: Joi.string().min(5).max(255).required(),
        matchDayTime: Joi.date()?.required(),
        playingField: Joi.string().min(5).max(255).required(),
        playersByTeam: Joi.number().integer().required()
    }),
    delete: Joi.object().keys({
        isDeleted: Joi.boolean().required()
    }),
};
