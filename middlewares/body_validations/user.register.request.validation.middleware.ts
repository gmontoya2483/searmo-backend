import {NextFunction, Request, Response, Router} from "express";
import { schemas } from '../../schemas/users.schema';

module.exports = function validateUserRegister (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schemas.register.validate(req.body);
    error ? res.status(422).json({
        ok: false,
        message: error.details[0].message.replace(/['"]+/g, "")
    })
        : next();
}



