import Joi from "@hapi/joi";
import passwordComplexity from "joi-password-complexity";
import {PASSWORD_COMPLEXITY_OPTIONS} from "../globals/environment.global";

export const schemas = {
    register: Joi.object().keys({
        email: Joi.string().min(5).max(255).required().email(),
        name: Joi.string().min(5).max(255).required(),
        last_name: Joi.string().min(5).max(255).required(),
        // @ts-ignore
        password: passwordComplexity(PASSWORD_COMPLEXITY_OPTIONS).required()

    })
};

