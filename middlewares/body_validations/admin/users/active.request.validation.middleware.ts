import {NextFunction, Request, Response, } from "express";
import { schemas } from '../../../../schemas/admin.users.schema';

module.exports = function validateUserActive (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schemas.active.validate(req.body);
    error ? res.status(422).json({
            ok: false,
            message: error.details[0].message.replace(/['"]+/g, "")
        })
        : next();
}
