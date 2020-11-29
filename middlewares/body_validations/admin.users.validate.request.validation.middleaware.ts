import {NextFunction, Request, Response} from "express";
import { schemas } from '../../schemas/admin.users.schema';

module.exports = function validateUserValidate (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schemas.validate.validate(req.body);
    error ? res.status(422).json({
            ok: false,
            message: error.details[0].message.replace(/['"]+/g, "")
        })
        : next();
}
